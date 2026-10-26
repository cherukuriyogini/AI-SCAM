import os
import json
import sqlite3
from pathlib import Path
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from models.schemas import (
    AnalyzeResponse,
    HistoryItem,
    IndicatorItem,
    RiskBreakdown,
    ExtractedEntities,
    UrlSecurityAnalysis
)

router = APIRouter(prefix="/api/history", tags=["History"])

# SQLite DB Path
DB_DIR = Path(__file__).resolve().parent.parent
DB_PATH = DB_DIR / "scam_history.db"

# In-memory fallback if disk SQLite is restricted
_memory_fallback: List[HistoryItem] = []

def get_db_connection():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    try:
        with get_db_connection() as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS analyses (
                    id TEXT PRIMARY KEY,
                    input_type TEXT,
                    input_text TEXT,
                    risk_score INTEGER,
                    risk_level TEXT,
                    category TEXT,
                    confidence INTEGER,
                    summary TEXT,
                    indicators_json TEXT,
                    risk_breakdown_json TEXT,
                    recommended_actions_json TEXT,
                    safety_tips_json TEXT,
                    extracted_entities_json TEXT,
                    url_security_json TEXT,
                    analysis_engine TEXT,
                    created_at TEXT
                )
            """)
            conn.commit()
    except Exception as e:
        print(f"Warning: SQLite init failed, using in-memory store: {e}")

# Run schema init
init_db()

def add_history_entry(item: AnalyzeResponse) -> HistoryItem:
    try:
        with get_db_connection() as conn:
            conn.execute("""
                INSERT OR REPLACE INTO analyses (
                    id, input_type, input_text, risk_score, risk_level, category, confidence,
                    summary, indicators_json, risk_breakdown_json, recommended_actions_json,
                    safety_tips_json, extracted_entities_json, url_security_json,
                    analysis_engine, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                item.id,
                item.input_type,
                item.input_text,
                item.risk_score,
                item.risk_level,
                item.category,
                item.confidence,
                item.summary,
                json.dumps([i.model_dump() for i in item.indicators]),
                json.dumps(item.risk_breakdown.model_dump()),
                json.dumps(item.recommended_actions),
                json.dumps(item.safety_tips),
                json.dumps(item.extracted_entities.model_dump()),
                json.dumps(item.url_security.model_dump() if item.url_security else None),
                item.analysis_engine,
                item.created_at
            ))
            conn.commit()
    except Exception as e:
        print(f"SQLite insert fallback: {e}")
        # In-memory fallback
        hist_item = HistoryItem(
            id=item.id,
            input_type=item.input_type,
            input_text=item.input_text,
            risk_score=item.risk_score,
            risk_level=item.risk_level,
            category=item.category,
            confidence=item.confidence,
            summary=item.summary,
            indicators=item.indicators,
            risk_breakdown=item.risk_breakdown,
            recommended_actions=item.recommended_actions,
            safety_tips=item.safety_tips,
            extracted_entities=item.extracted_entities,
            url_security=item.url_security,
            analysis_engine=item.analysis_engine,
            created_at=item.created_at
        )
        _memory_fallback.insert(0, hist_item)

    return HistoryItem(
        id=item.id,
        input_type=item.input_type,
        input_text=item.input_text,
        risk_score=item.risk_score,
        risk_level=item.risk_level,
        category=item.category,
        confidence=item.confidence,
        summary=item.summary,
        indicators=item.indicators,
        risk_breakdown=item.risk_breakdown,
        recommended_actions=item.recommended_actions,
        safety_tips=item.safety_tips,
        extracted_entities=item.extracted_entities,
        url_security=item.url_security,
        analysis_engine=item.analysis_engine,
        created_at=item.created_at
    )

def row_to_history_item(row) -> HistoryItem:
    indicators_raw = json.loads(row["indicators_json"] or "[]")
    indicators = [IndicatorItem(**i) for i in indicators_raw]
    
    breakdown_raw = json.loads(row["risk_breakdown_json"] or "{}")
    risk_breakdown = RiskBreakdown(**breakdown_raw)
    
    entities_raw = json.loads(row["extracted_entities_json"] or "{}")
    entities = ExtractedEntities(**entities_raw)
    
    url_sec_raw = json.loads(row["url_security_json"] or "null")
    url_sec = UrlSecurityAnalysis(**url_sec_raw) if url_sec_raw else None

    return HistoryItem(
        id=row["id"],
        input_type=row["input_type"] or "message",
        input_text=row["input_text"] or "",
        risk_score=row["risk_score"] or 0,
        risk_level=row["risk_level"] or "LOW",
        category=row["category"] or "General",
        confidence=row["confidence"] or 80,
        summary=row["summary"] or "",
        indicators=indicators,
        risk_breakdown=risk_breakdown,
        recommended_actions=json.loads(row["recommended_actions_json"] or "[]"),
        safety_tips=json.loads(row["safety_tips_json"] or "[]"),
        extracted_entities=entities,
        url_security=url_sec,
        analysis_engine=row["analysis_engine"] or "Pattern & Heuristic AI Engine",
        created_at=row["created_at"] or ""
    )

@router.get("", response_model=List[HistoryItem])
async def get_history(
    search: Optional[str] = Query(None, description="Search keyword in text or summary"),
    risk_level: Optional[str] = Query(None, description="Filter by HIGH, MEDIUM, LOW, SAFE"),
    category: Optional[str] = Query(None, description="Filter by scam category")
):
    try:
        with get_db_connection() as conn:
            query = "SELECT * FROM analyses ORDER BY created_at DESC LIMIT 100"
            rows = conn.execute(query).fetchall()
            items = [row_to_history_item(r) for r in rows]
    except Exception:
        items = _memory_fallback

    # Apply in-memory filtering
    if risk_level:
        items = [h for h in items if h.risk_level.upper() == risk_level.upper()]
    if category:
        items = [h for h in items if category.lower() in h.category.lower()]
    if search:
        s = search.lower()
        items = [
            h for h in items
            if s in h.input_text.lower() or s in h.summary.lower() or s in h.category.lower()
        ]
    return items

@router.delete("/{item_id}")
async def delete_history_item(item_id: str):
    try:
        with get_db_connection() as conn:
            cur = conn.execute("DELETE FROM analyses WHERE id = ?", (item_id,))
            conn.commit()
            if cur.rowcount == 0:
                raise HTTPException(status_code=404, detail="History entry not found.")
    except HTTPException:
        raise
    except Exception:
        global _memory_fallback
        _memory_fallback = [h for h in _memory_fallback if h.id != item_id]
        
    return {"success": True, "message": f"Deleted analysis {item_id}"}

@router.delete("")
async def clear_all_history():
    try:
        with get_db_connection() as conn:
            conn.execute("DELETE FROM analyses")
            conn.commit()
    except Exception:
        global _memory_fallback
        _memory_fallback = []
        
    return {"success": True, "message": "All history cleared."}
