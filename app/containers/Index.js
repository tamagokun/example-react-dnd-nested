import React, { Component } from 'react'
import Tree from '../components/Tree'

export default class Index extends Component {
  state = {
    tree: [
      {
        id: 1, title: 'Tatooine',
        children: [
          {id: 2, title: 'Endor', children: []},
          {id: 3, title: 'Hoth', children: []},
          {id: 4, title: 'Dagobah', children: []},
        ]
      },
      {
        id: 5, title: 'Death Star',
        children: []
      },
      {
        id: 6, title: 'Alderaan',
        children: [
          {
            id: 7, title: 'Bespin',
            children: [
              {id: 8, title: 'Jakku', children: []}
            ]
          }
        ]
      }
    ]
  };

  moveItem(id, afterId, nodeId) {
    if (id == afterId) return

    let {tree} = this.state

    const removeNode = (id, items) => {
      for (const node of items) {
        if (node.id == id) {
          items.splice(items.indexOf(node), 1)
          return
        }

        if (node.children && node.children.length) {
          removeNode(id, node.children)
        }
      }
    }

    const item = {...this.findItem(id, tree)}
    if (!item.id) {
      return
    }

    const dest = nodeId ? this.findItem(nodeId, tree).children : tree

    if (!afterId) {
      removeNode(id, tree)
      dest.push(item)
    } else {
      const index = dest.indexOf(dest.filter(v => v.id == afterId).shift())
      removeNode(id, tree)
      dest.splice(index, 0, item)
    }

    this.setState({tree})
  }

  findItem(id, items) {
    for (const node of items) {
      if (node.id == id) return node
      if (node.children && node.children.length) {
        const result = this.findItem(id, node.children)
        if (result) {
          return result
        }
      }
    }

    return false
  }

  render() {
    const {tree} = this.state

    return <div>
      <Tree
        parent={null}
        items={tree}
        move={this.moveItem.bind(this)}
        find={this.findItem.bind(this)}
      />
    </div>
  }
}
