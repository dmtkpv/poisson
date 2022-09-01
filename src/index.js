export default function createPoisson (options) {



    // ------------------------
    // Data
    // ------------------------

    const { width, height, distance, ratio, tries, linkHorizontal, linkVertical, beforeCreate } = Object.assign({
        width: 100,
        height: 100,
        distance: 10,
        ratio: 1,
        tries: 20,
        linkHorizontal: false,
        linkVertical: false,
        beforeCreate: point => point
    }, options)

    const radius = {
        x: ratio > 1 ? distance * ratio : distance,
        y: ratio > 1 ? distance : distance / ratio
    }

    const cell = {
        width: radius.x / Math.sqrt(2),
        height: radius.y / Math.sqrt(2)
    }

    const grid = {
        width: Math.ceil(width / cell.width),
        height: Math.ceil(height / cell.height),
    }

    const origin = createPoint({
        x: Math.random() * width,
        y: Math.random() * height
    })



    // ------------------------
    // Storages
    // ------------------------

    const points = [];
    const pending = [];
    const projected = Array.from(Array(grid.width), () => new Array(grid.height))

    function save (point) {
        points.push(point);
        pending.push(point);
        projected[point.gridX][point.gridY] = point;
    }

    save(origin);



    // ------------------------
    // Points
    // ------------------------

    function createPoint (coords) {
        const point = beforeCreate(coords);
        point.gridX = Math.floor(point.x / cell.width);
        point.gridY = Math.floor(point.y / cell.height);
        return point;
    }

    function createPointAround (point) {
        const a = 2 * Math.PI * Math.random();
        const s = 1 + Math.random();
        const x = point.x + radius.x * s * Math.cos(a);
        const y = point.y + radius.y * s * Math.sin(a);
        return createPoint({ x, y });
    }



    // ------------------------
    // Helpers
    // ------------------------

    function outsideCanvas (point) {
        return point.x < 0 || point.x > width || point.y < 0 || point.y > height;
    }

    function inEllipse (origin, point) {
        return Math.pow(point.x - origin.x, 2) / Math.pow(radius.x, 2) + Math.pow(point.y - origin.y, 2) / Math.pow(radius.y, 2) <= 1;
    }



    // ------------------------
    // Neighbors
    // ------------------------

    function getNeighbors (origin, max, translate, link) {
        const neighbors = [];
        for (let i = 0; i < 5; i++) {
            let value = origin - 2 + i;
            let delta = 0;
            if (value < 0) {
                if (link) delta = 1;
                else continue;
            }
            if (value >= max) {
                if (link) delta = -1;
                else continue;
            }
            neighbors.push({
                value: value + max * delta,
                translate: translate * -delta
            })
        }
        return neighbors;
    }

    function translate (point, tx, ty) {
        point = { ...point };
        point.x += tx;
        point.y += ty;
        return point;
    }

    function hasNeighbor (point) {
        const xs = getNeighbors(point.gridX, grid.width, width, linkHorizontal);
        const ys = getNeighbors(point.gridY, grid.height, height, linkVertical);
        for (const x of xs) {
            for (const y of ys) {
                let origin = projected[x.value][y.value];
                if (!origin) continue;
                origin = translate(origin, x.translate, y.translate)
                if (inEllipse(origin, point)) return origin;
            }
        }
    }



    // ------------------------
    // Generate points
    // ------------------------

    while (pending.length) {
        const current = pending.pop();
        for (let i = 0; i < tries; i++) {
            const point = createPointAround(current);
            if (outsideCanvas(point)) continue;
            if (hasNeighbor(point)) continue;
            save(point);
        }
    }



    // ------------------------
    // Exports
    // ------------------------

    return {
        radius,
        cell,
        grid,
        origin,
        points
    }



}