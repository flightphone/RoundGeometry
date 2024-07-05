// vertices - The object is the vertices of the contour, all dimensions are in millimeters, but the grid should be in meters
// upper_edge_rounded - Rounding the top edge of the current face
// lower_edge_rounded - Rounding the lower edge of the current face
const vertices = {
    1: {
        id: 1,
        x: -450,
        y: -150,
        upper_edge_rounded: false,
        lower_edge_rounded: false,
        next: 2,
        prev: 4
    },
    2: {
        id: 2,
        x: -450,
        y: 150,
        upper_edge_rounded: false,
        lower_edge_rounded: false,
        next: 3,
        prev: 1
    },
    3: {
        id: 3,
        x: 450,
        y: 150,
        upper_edge_rounded: false,
        lower_edge_rounded: false,
        next: 4,
        prev: 2
    },
    4: {
        id: 4,
        x: 450,
        y: -150,
        upper_edge_rounded: false,
        lower_edge_rounded: false,
        next: 1,
        prev: 3
    }
};
const makeGeometry = (
    vertices/*an object with vertices*/ = {},
    radius/*radius of rounding*/ = 6,
    segments/*number of segments of rounding*/ = 3, 
    size/*panel thickness*/ = 38
) => {
	
    ...
}

Demo: https://flightphone.github.io/roundGeometry.html