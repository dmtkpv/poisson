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

### `width`, `height`
The area where the points will be placed  
**Default: 100, 100**

### `distance`
Minimum distance between points  
**Default: 10**

### `ratio`
Ratio between X-axis distance and Y-axis distance  
**Default: 1**

### `attempts`
Number of attempts to place a point (the higher the value, the more accurate, but lower performance)  
**Default: 20**

### `linkHorizontal`, `linkVertical` 
Take into account the distance between the end and the beginning   
**Default: false**


### `beforeCreate(point)`
Runs before the point is created, must return `x` and `y`



## Return properties

### `radius { x, y }`
Radius of the ellipse on which new points are created

### `cell { width, height }`
Cell size that can contain only one point

### `grid { width, height }`
Number of cells in width and height

### `origin { x, y, gridX, gridY }`
Coordinates of the very first point

### `points [{ x, y, gridX, gridY }]`
Points that have been placed

