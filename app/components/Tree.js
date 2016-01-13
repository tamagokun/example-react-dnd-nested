import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import Item from './Item'

const target = {
  drop() {},

  hover(props, monitor) {
    const {id: draggedId, parent, items} = monitor.getItem()

    if (!monitor.isOver({shallow: true})) return

    const descendantNode = props.find(props.parent, items)
    if (descendantNode) return
    if (parent == props.parent || draggedId == props.parent) return

    props.move(draggedId, props.id, props.parent)
  }
}

@DropTarget('ITEM', target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Tree extends Component {
  static propTypes = {
    items  : PropTypes.array.isRequired,
    parent : PropTypes.any,
    move   : PropTypes.func.isRequired,
    find   : PropTypes.func.isRequired
  };

  render() {
    const {connectDropTarget, items, parent, move, find} = this.props

    return connectDropTarget(
      <div style={{
        position: 'relative',
        minHeight: 10,
        paddingTop: 10,
        marginTop: -11,
        marginLeft: '2em'
      }}>
        {items.map((item, i) => {
          return <Item
            key={item.id}
            id={item.id}
            parent={parent}
            item={item}
            move={move}
            find={find}
          />
        })}
      </div>
    )
  }
}
