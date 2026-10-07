import supabase from "../config/supabase.js";
import * as demo from "../config/demoData.js";

let localEvents = [...demo.calendarEvents];
let nextId = Math.max(...localEvents.map((e) => e.id), 0) + 1;

/**
 * GET /api/calendar?month=2025-01
 */
export async function getEvents(req, res) {
  try {
    if (supabase) {
      let query = supabase.from("calendar_events").select("*");
      if (req.query.month) {
        query = query
          .gte("date", `${req.query.month}-01`)
          .lt("date", `${req.query.month}-32`);
      }
      const { data, error } = await query.order("date");
      if (error) throw error;
      return res.json(data);
    }

    let result = [...localEvents];
    if (req.query.month) {
      result = result.filter((e) => e.date.startsWith(req.query.month));
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * POST /api/calendar
 */
export async function createEvent(req, res) {
  try {
    const { title, type, date, owner } = req.body;
    if (supabase) {
      const { data, error } = await supabase
        .from("calendar_events")
        .insert({ title, type, date, owner })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    const event = { id: nextId++, title, type, date, owner };
    localEvents.push(event);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * DELETE /api/calendar/:id
 */
export async function deleteEvent(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (supabase) {
      const { error } = await supabase
        .from("calendar_events")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return res.json({ success: true });
    }

    localEvents = localEvents.filter((e) => e.id !== id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
