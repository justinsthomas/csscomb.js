
const gonzales = require('gonzales-pe');

module.exports = {
    name: 'space-after-closing-brace',

    runBefore: 'block-indent',

    syntax: ['css', 'less', 'scss'],

    accepts: {
        number: true,
        string: /^[ \t\n]*$/
    },

  /**
   * Processes tree node.
   *
   * @param {node} ast
   */
    process: function(ast) {
        const value = this.value;
        let precedingBlock;

        ast.traverse(function(node) {
            console.log(node);

            if(!node.is('include')) {
                return;
            }

            if(node.last() && node.last().is('space')) {
                node.last().content = value;
            } else if (value !== '') {
                const space = gonzales.createNode({
                    type: 'space',
                    content: value
                });
                node.content.push(space);
            }

      // If found block node stop at the next one for space check
            // if (!node.is('block') && !node.is('atrulers')) {
            //     return;
            // }
      //
    //         if (node.first() && node.first().is('space')) {
    //             node.first().content = value;
    //         } else if (value !== '') {
    //             const space = gonzales.createNode({
    //                 type: 'space',
    //                 content: value
    //             });
    //             node.insert(0, space);
    //         }
        });
    },

  /**
   * Detects the value of an option at the tree node.
   *
   * @param {node} ast
   */
    detect: function(ast) {
        const detected = [];

        // ast.traverse(function(node) {
        //     if (!node.is('block') && !node.is('atrulers')) {return;}
        //
        //     if (node.first().is('space')) {
        //         detected.push(node.first().content);
        //     } else {
        //         detected.push('');
        //     }
        // });

        return detected;
    }
};
