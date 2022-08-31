# @dmtkpv/possion
2D Poisson disk sampling based on [the article](http://devmag.org.za/2009/05/03/poisson-disk-sampling/)


## Usage
Install module
```
npm install @dmtkpv/possion
```

Generate points

```js
import createPoisson from '@dmtkpv/possion'

const { points } = createPoisson({
    // options
})
```

## Options

```js
const poisson = createPoisson({

    // The size of the rectangle on which the points will be placed
    width: 100,
    height: 100,

    // Minimum distance between points
    distance: 10,

    // Ratio between X-axis distance and Y-axis distance
    ratio: 1,

    // Number of attempts to place a point 
    // (the higher the value, the more accurate, but lower performance)
    attempts: 20,

    // Take into account the distance between the end and the beginning
    linkHorizontal: false,
    linkVertical: false,

    // Runs before the point is created, must return `x` and `y`
    beforeCreate: point => point

})
```
### Return properties

```js
const { 
    
    // Radius of the ellipse on which new points are created
    radius: { x, y }, 

    // Cell size that can contain only one point
    cell: { width, height },

    // Number of cells in width and height
    grid: { width, height },

    // Coordinates of the very first point
    origin: { x, y, gridX, gridY },

    // Points that have been placed
    points: [{ x, y, gridX, gridY }]

} = createPoisson()
```
