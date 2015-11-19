import React from 'react'
import ReactDOM from 'react-dom'

import List from './list.js'
import Modal from './modal.js'
import Slideshow from './slideshow.js'


class Uploader extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
      editing: [],
      editingIndex: null,
      showModal: false,
      showSlideshow: false
    }
  }

  saveItems(data) {
    const toSave = Array.isArray(data) ? data : [data]
    if (this.state.editingIndex || this.state.editingIndex === 0) {
      this.state.items.splice(this.state.editingIndex, 1, toSave[0])
      this.setState({
        items: this.state.items,
        showModal: false,
        editing: [],
        editingIndex: null
      })

    } else {
      this.setState({
        items: this.state.items.concat(toSave),
        showModal: false,
        editing: []
      })
    }
  }

  render() {
    return (
      <section id="uploader">
        <List
          items={this.state.items}
          showModal={() => this.setState({ showModal: true })}
          showSlideshow={() => this.setState({ showSlideshow: true })}
          startEditing={(itemsToEdit, index) => this.setState({
            editing: [itemsToEdit],
            editingIndex: index,
            showModal: true
          })}
          reOrderItems={items => this.setState({items: items})}>
        </List>

        {this.state.showModal ?
        <Modal
          items={this.state.items}
          saveItems={this.saveItems.bind(this)}
          editing={this.state.editing}
          editPickedFiles={pickedFiles => this.setState({
            editing: pickedFiles
          })}
          cancelModal={() => this.setState({
            showModal: false,
            editing: []
          })}>
        </Modal>
        : null
        }

        {this.state.showSlideshow ?
        <Slideshow
          hideSlideshow={() => this.setState({ showSlideshow: false })}
          items={this.state.items}>
        </Slideshow>
        : null
        }
      </section>
    )
  }
}

uploader = ReactDOM.render( <Uploader />, document.getElementsByTagName('uploader')[0] )
