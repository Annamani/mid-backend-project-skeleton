import { listEvents, countEvents } from "#models/events.js";

/**
 * GET /api/events
 *
 * Query Parameters:
 * - page (number, optional, default = 0)
 *
 * Pagination Strategy:
 * - Fixed page size (PAGE_SIZE)
 * - offset = page * PAGE_SIZE
 * - totalItems calculated via countEvents()
 * - totalPages = ceil(totalItems / PAGE_SIZE)
 *
 * Response Shape:
 * {
 *   data: Array<Event>,
 *   meta: {
 *     page: number,
 *     pageSize: number,
 *     totalItems: number,
 *     totalPages: number
 *   }
 * }
 *
 * Notes:
 * - Filtering can be added later by mapping req.query → filters object.
 * - Sorting validation should be handled before passing orderBy.
 */
export async function getEvents(req, res, next) {
    try {
        const PAGE_SIZE = 5;

        // Parse page safely (ensure non-negative integer)
        const page = Math.max(Number(req.query.page ?? 0), 0);
        const offset = page * PAGE_SIZE;

        const filters = {}; // TODO: map req.query filters here

        // Run queries in parallel for better performance
        const [data, totalItems] = await Promise.all([
            listEvents(filters, {
                limit: PAGE_SIZE,
                offset,
                orderBy: "id",
                order: "asc",
            }),
            countEvents(filters),
        ]);

        const totalPages = Math.ceil(totalItems / PAGE_SIZE);

        res.json({
            data,
            meta: {
                page,
                pageSize: PAGE_SIZE,
                totalItems,
                totalPages,
            },
        });
    } catch (error) {
        next(error); // Delegate to Express error middleware
    }
}