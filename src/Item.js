import React from 'react';
import { connect } from 'react-redux';
import { withEntityHolder } from './entityHolder/withEntityHolder';
import { getEntity } from './app-on-release/store';

const _Item = ({ id, title, content }) => (
  <div style={style.container}>
    {id}
    <center>{title} - {content}</center>
  </div>
)

const style = {
  container: { border: "1px solid blue", marginBottom: 10, height: "100%" }
}

const mapStateToProps = (state, props) => {
  const { title, content, id } = getEntity(state, props.id)

  return {
    id,
    title,
    content
  }
}

export const Item = withEntityHolder(connect(mapStateToProps)(_Item))