import supabase from "../config/supabase.js";
import * as demo from "../config/demoData.js";

/* ─── Generic CRUD helpers for demo & Supabase modes ─── */

function makeController(tableName, demoArray) {
  let localData = [...demoArray];
  let nextId = Math.max(...localData.map((r) => r.id), 0) + 1;

  return {
    /** GET /api/:resource */
    async getAll(req, res) {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .order("id", { ascending: true });
          if (error) throw error;
          return res.json(data);
        }
        // Demo mode — apply scope filtering if user has scopeKeys
        let result = [...localData];
        if (req.user?.scopeKeys) {
          const ownerField =
            tableName === "tasks" ? "assignee" : "owner";
          result = result.filter((r) =>
            req.user.scopeKeys.some((k) =>
              (r[ownerField] || "").includes(k)
            )
          );
        }
        res.json(result);
      } catch (err) {
        console.error(`GET ${tableName} error:`, err);
        res.status(500).json({ error: err.message });
      }
    },

    /** GET /api/:resource/:id */
    async getById(req, res) {
      try {
        const id = parseInt(req.params.id);
        if (supabase) {
          const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq("id", id)
            .single();
          if (error) throw error;
          return res.json(data);
        }
        const item = localData.find((r) => r.id === id);
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },

    /** POST /api/:resource */
    async create(req, res) {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from(tableName)
            .insert(req.body)
            .select()
            .single();
          if (error) throw error;
          return res.status(201).json(data);
        }
        const record = { id: nextId++, ...req.body };
        localData.push(record);
        res.status(201).json(record);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },

    /** PUT /api/:resource/:id */
    async update(req, res) {
      try {
        const id = parseInt(req.params.id);
        if (supabase) {
          const { data, error } = await supabase
            .from(tableName)
            .update(req.body)
            .eq("id", id)
            .select()
            .single();
          if (error) throw error;
          return res.json(data);
        }
        const idx = localData.findIndex((r) => r.id === id);
        if (idx === -1) return res.status(404).json({ error: "Not found" });
        localData[idx] = { ...localData[idx], ...req.body };
        res.json(localData[idx]);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },

    /** DELETE /api/:resource/:id */
    async remove(req, res) {
      try {
        const id = parseInt(req.params.id);
        if (supabase) {
          const { error } = await supabase
            .from(tableName)
            .delete()
            .eq("id", id);
          if (error) throw error;
          return res.json({ success: true });
        }
        localData = localData.filter((r) => r.id !== id);
        res.json({ success: true });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },
  };
}

export const contactsController = makeController("contacts", demo.contacts);
export const companiesController = makeController("companies", demo.companies);
export const dealsController = makeController("deals", demo.deals);
export const tasksController = makeController("tasks", demo.tasks);
export const productsController = makeController("products", demo.products);
export const invoicesController = makeController("invoices", demo.invoices);
