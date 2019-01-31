import React from 'react';
import { connect } from 'react-redux';
import { List as Vlist } from 'react-virtualized';
import { Item } from './Item';

class _List extends React.Component {
  rowRenderer = ({ key, style, index }) => (
    <div key={key} style={style}>
      <Item id={this.props.allIds[index]} />
    </div>
  )

  render () {
    const { allIds } = this.props

    return (
      <div style={styles.container}>
        <Vlist
          autoHeight={false}
          width={200}
          height={300}
          rowHeight={100}
          rowRenderer={this.rowRenderer}
          rowCount={allIds.length}
          columnWidth={100}
        />
      </div>
    )
  }
}

const styles = {
  container: { border: "1px solid black", height: 300 }
}

export const List = connect(({ entities: { allIds } }) => ({
  allIds
}))(_List)