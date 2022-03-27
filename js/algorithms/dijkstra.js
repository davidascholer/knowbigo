/*
         [apple]--6-->[mango]----2--|
          ^            1 ^          |
        7 |              |          v
[start]---|           [grape]    [peach]
          |              ^         ^
        5 v            1 |         | 2
         [banana]-3->[kiwi]-3->[strawberry]
*/

module.exports = dijkstra = () => {
    const edges = {
        'start': {
            'apple': 7,
            'banana': 5
        },
        'banana': {
            'kiwi': 3,
        },
        'kiwi': {
            'grape': 1,
            'strawberry': 3
        },
        'grape': {
            'mango': 1
        },
        'strawberry': {
            'peach': 2
        },
        'apple': {
            'mango': 6
        },
        'mango': {
            'peach': 2
        },
        'peach': {}
    };
    const vertices = {
        'start': {
            cost: 0,
            parent: null
        },
        'apple': {
            cost: Infinity,
            parent: null
        },
        'banana': {
            cost: Infinity,
            parent: null
        },
        'kiwi': {
            cost: Infinity,
            parent: null
        },
        'grape': {
            cost: Infinity,
            parent: null
        },
        'strawberry': {
            cost: Infinity,
            parent: null
        },
        'mango': {
            cost: Infinity,
            parent: null
        },
        'peach': {
            cost: Infinity,
            parent: null
        }
    };

    const visited = [];

    let node = 'start';
    while (node !== null) {
        // get the neighbors and cost of the vertex
        const neighbors = Object.keys(edges[node]);
        // update the parent and cost if less than current cost
        for (let n of neighbors) {
            const currentCost = vertices[node]['cost'] + edges[node][n];
            const prevCost = vertices[n]['cost'];
            if (currentCost < prevCost) {
                vertices[n]['cost'] = currentCost;
                vertices[n]['parent'] = node;
            }
        }
        // find the smallest cost vertex known (hasn't been visited)
        let cheapestNode = null;
        let cheapestNodeCost = Infinity;
        for (let vertex of Object.keys(vertices)) {
            if (vertices[vertex]['cost'] < cheapestNodeCost && !visited.includes(vertex)) {
                cheapestNodeCost = vertices[vertex]['cost'];
                cheapestNode = vertex;
            }
        }
        // mark the node as visited
        visited.push(node);
        // repeat until all vertices have been visited
        node = cheapestNode;
    }

    console.log('vertices: ' + JSON.stringify(vertices));

}