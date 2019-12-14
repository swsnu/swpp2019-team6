import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HotelIcon from '@material-ui/icons/Hotel';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import CardMedia from '@material-ui/core/CardMedia';

import * as actionCreators from '../../store/actions/index';
import TravelHeaderBlockEdit from '../../components/travelblock/TravelHeaderBlockEdit';
import TravelTransportationBlockEdit from '../../components/travelblock/TravelTransportationBlockEdit';
import TravelCustomBlockEdit from '../../components/travelblock/TravelCustomBlockEdit';
import TravelActivityBlockEdit from '../../components/travelblock/TravelActivityBlockEdit';
import TravelDayBlock from '../../components/travelblock/TravelDayBlock';
import TagBlock from '../../components/travelblock/TagBlock';

const getCardMediaStyle = () => ({
  objectFit: 'cover',
  width: 320,
  height: 250,
});

const getFabStyle = (_top) => ({
  margin: 2,
  position: 'fixed',
  left: '3rem',
  top: _top,
});

const getFloatStyle = (isDragging, draggableStyle, otherDragging) => ({
  background: isDragging ? 'green' : 'transparent',
  shadow: isDragging ? 2 : 0,
  border: isDragging ? '2px solid black' : 0,
  borderRadius: 8,
  minWidth: isDragging ? 720 : 'inherit',
  minHeight: isDragging ? 100 : 'inherit',
  ...draggableStyle,
  opacity: (isDragging && 0.30) || (otherDragging && 0.90) || 0.0,
});

const getListStyle = (isDraggingOver) => ({
  width: 720,
  minHeight: 100,
});

const getButtonDivStyle = (isDraggingOver) => ({
  position: 'absolute',
  left: 0,
  top: 0,
});

const getPaddingStyle = () => ({
  minHeight: 100,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const isEqualDate = (self, other) => {
  if (self.getFullYear() === other.getFullYear()
    && self.getMonth() === other.getMonth()
    && self.getDate() === other.getDate()) {
    return true;
  }
  return false;
};

const compareWithDate = (self, other) => {
  const newSelf = new Date(self.getFullYear(), self.getMonth(), self.getDate());
  const newOther = new Date(other.getFullYear(), other.getMonth(), other.getDate());
  if (newSelf < newOther) {
    return true;
  }
  return false;
};


class CreateTravel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: this.props.header || {
        startDate: new Date(),
        endDate: new Date(),
        title: '',
      },
      items: this.props.items || [{
        id: 'day-0',
        info: {
          datetime: new Date(),
          title: '',
          expand: true,
        },
      }],
      tags: this.props.tags || [],
      buttonDraggable: true,
      travelPhoto: null,
      imagePreviewUrl: null,

    };
    // if (props.travel.header) {
    //   this.state.header = props.travel.header;
    // }
    // if (props.travel.items) {
    //   this.state.items = props.travel.items;
    // }
    this.setHeader = this.setHeader.bind(this);
    this.setItems = this.setItems.bind(this);
    this.setTags = this.setTags.bind(this);
    this.setButtonDraggable = this.setButtonDraggable.bind(this);
  }

  componentDidMount() {
    if (this.props.mode === 'edit') {
      this.props.getTravel(this.props.match.params.id, true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items && this.props.items !== prevProps.items) {
      this.setItems(this.props.items);
    }
    if (this.props.header && this.props.header !== prevProps.header) {
      this.setHeader(this.props.header);
    }
    if (this.props.tags && this.props.tags !== prevProps.tags) {
      this.setTags(this.props.tags);
    }
  }

  handleClickCreate = (e) => {
    const form_data = new FormData();
    if (this.state.travelPhoto) {
      form_data.append('photo', this.state.travelPhoto, this.state.travelPhoto.name);
    }

    if (this.props.mode === 'edit') {
      this.props.editTravel(this.props.id, {
        header: this.state.header,
        items: this.state.items,
        tags: this.state.tags,
      });
    } else {
      this.props.createTravel({
        header: this.state.header,
        items: this.state.items,
        tags: this.state.tags,
      }, form_data);
    }
  }

  setHeader = (_header) => {
    this.setState({ header: _header });
  }

  setTags = (_tags) => {
    if (_tags !== this.state.tags) {
      this.setState({ tags: _tags });
    }
  }

  setItems = (_items) => {
    this.setState({ items: _items });
  }

  setButtonDraggable = (_buttonDraggable) => {
    this.setState({ buttonDraggable: _buttonDraggable });
  }
  // const [buttonDraggable, setButtonDraggable] = useState(true);
  // const [startDate, setStartDate] = React.useState(new Date());
  // const [endDate, setEndDate] = React.useState(new Date());
  // const initItem = {
  //   id: 'day-0',
  //   info: {
  //     datetime: new Date(startDate),
  //     title: '',
  //     expand: true,
  //   },
  // };
  // const [items, setItems] = useState(props.items || [initItem]);
  // const [travelTitle, setTravelTitle] = React.useState('Travel Title');

  onChangeTravelPhoto = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        travelPhoto: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const getMaxItemIndex = () => {
      return this.state.items.length;
    };

    /*
    * Add TravelDayBlock when a user change period of the travel.
    * Assumed that the user change at most one period range.
    */
    const handlePeriodChange = (_items, _setItems) => {
      return (_startDate, _endDate) => {
        let i;
        let prevStartDate = new Date(0);
        let prevEndDate = new Date(2080, 1, 1);
        const newStartDate = new Date(_startDate);
        const newEndDate = new Date(_endDate);
        const itemlist = Array.from(_items);
        for (i = 0; i < itemlist.length; i++) {
          if (itemlist[i].id.startsWith('day')
            && (compareWithDate(itemlist[i].info.datetime, newStartDate)
            || compareWithDate(newEndDate, itemlist[i].info.datetime))) {
            itemlist.splice(i, 1);
            i -= 1;
          }
        }

        for (i = 0; i < itemlist.length; i++) {
          if (itemlist[i].id.startsWith('day')) {
            prevStartDate = new Date(itemlist[i].info.datetime);
            break;
          }
        }
        for (i = itemlist.length - 1; i >= 0; i--) {
          if (itemlist[i].id.startsWith('day')) {
            prevEndDate = new Date(itemlist[i].info.datetime);
            break;
          }
        }

        while (compareWithDate(newStartDate, prevStartDate)) {
          prevStartDate.setDate(prevStartDate.getDate() - 1);
          const newItem = {
            id: `day-${itemlist.length}`,
            info: {
              datetime: new Date(prevStartDate),
              title: '',
              expand: true,
            },
          };
          itemlist.splice(0, 0, newItem);
        }
        while (compareWithDate(prevEndDate, newEndDate)) {
          prevEndDate.setDate(prevEndDate.getDate() + 1);
          const newItem = {
            id: `day-${itemlist.length}`,
            info: {
              datetime: new Date(prevEndDate),
              title: '',
              expand: true,
            },
          };
          itemlist.push(newItem);
        }
        while (compareWithDate(newStartDate, newEndDate)) {
          let check = false;
          for (i = itemlist.length - 1; i >= 0; i--) {
            if (itemlist[i].id.startsWith('day') && isEqualDate(itemlist[i].info.datetime, newEndDate)) {
              check = true;
              break;
            }
          }
          if (!check) {
            const newItem = {
              id: `day-${itemlist.length}`,
              info: {
                datetime: new Date(newEndDate),
                title: '',
                expand: true,
              },
            };
            itemlist.splice(0, 0, newItem);
          }
          newEndDate.setDate(newEndDate.getDate() - 1);
        }
        this.setItems(itemlist);
      };
    };

    const handleRemove = (index) => {
      const removeItems = Array.from(this.state.items);
      removeItems.splice(index, 1);
      this.setItems(removeItems);
    };

    const handleBlockInfo = (index, key, value) => {
      const newItems = this.state.items.map(
        (item, idx) => ((index === idx)
          ? ((key === 'title') && { ...item, info: { ...item.info, title: value } })
          || ((key === 'description') && { ...item, info: { ...item.info, description: value } })
          || ((key === 'expand') && { ...item, info: { ...item.info, expand: value } })
          || ((key === 'startTime') && { ...item, info: { ...item.info, startTime: value } })
          || ((key === 'endTime') && { ...item, info: { ...item.info, endTime: value } })
          || ((key === 'startPoint') && { ...item, info: { ...item.info, startPoint: value } })
          || ((key === 'endPoint') && { ...item, info: { ...item.info, endPoint: value } })
          || ((key === 'point') && { ...item, info: { ...item.info, point: value } })
          : item),
      );
      this.setItems(newItems);
    };

    const onBeforeDragStart = (event) => {
      this.setButtonDraggable(false);
    };

    const onDragEnd = (result) => {
      this.setButtonDraggable(true);
      if (!result.destination) {
        return;
      }

      let pushItems = Array.from(this.state.items);

      const maxId = getMaxItemIndex();
      let sourceIndex = maxId;
      const newItem = {
        id: '',
        info: {
          title: '',
          description: '',
          time: new Date('2030-01-01T09:00:00'),
          point: '',
          expand: false,
        },
      };
      if (result.draggableId === 'transportation') {
        newItem.id = `transportation-${maxId}`;
        pushItems.push(newItem);
      } else if (result.draggableId === 'activity') {
        newItem.id = `activity-${maxId}`;
        pushItems.push(newItem);
      } else if (result.draggableId === 'hotel') {
        newItem.id = `hotel-${maxId}`;
        pushItems.push(newItem);
      } else if (result.draggableId === 'restaurant') {
        newItem.id = `restaurant-${maxId}`;
        pushItems.push(newItem);
      } else if (result.draggableId === 'custom') {
        newItem.id = `custom-${maxId}`;
        pushItems.push(newItem);
      } else {
        sourceIndex = result.source.index;
        pushItems = this.state.items;
      }
      const newItems = reorder(
        pushItems,
        sourceIndex,
        result.destination.index > 0 ? result.destination.index : 1,
      );
      this.setItems(newItems);
    };


    // let skip = !items[0].info.expand;
    // console.log("state", this.state);
    const photoArea = this.state.imagePreviewUrl
      ? (
        <Button variant="outlined" component="span">
          <CardMedia
            style={getCardMediaStyle()}
            image={this.state.imagePreviewUrl}
            title="Travel Photo"
          />
        </Button>
      ) : (
        <Button variant="outlined" component="span" size="large">
          Add a New Photo
        </Button>
      );

    return (

      <Grid container alignItems="center" direction="column" justify="space-around">
        <Grid container alignItems="center" direction="column" justify="space-around">
          <label htmlFor="button-file">
            {photoArea}
          </label>
          <input
            accept="image/*"
            id="button-file"
            type="file"
            style={{ visibility: 'hidden' }}
            onChange={this.onChangeTravelPhoto}
          />
        </Grid>
        <Grid container alignItems="center" direction="column" justify="space-around">
          <TravelHeaderBlockEdit
            header={this.state.header}
            setHeader={this.setHeader}
            handlePeriodChange={handlePeriodChange(this.state.items, this.setItems)}
          />
        </Grid>
        <DragDropContext
          onBeforeDragStart={onBeforeDragStart}
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId="droppableList">
            {(provided, snapshot) => (
              <>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="space-around"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="space-around"
                  >
                    <TravelDayBlock
                      items={this.state.items}
                      index={0}
                      handleBlockInfo={handleBlockInfo}
                    />
                  </Grid>
                  {this.state.items.slice(1).map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index + 1} isDragDisabled={item.id.startsWith('day')}>
                      {(_provided, _snapshot) => {
                        // if (item.id.startsWith('day')) {
                        //   skip = !item.info.expand;
                        // }
                        // if (!(item.id.startsWith('day')) && skip) {
                        //   return (
                        //     <div
                        //       ref={_provided.innerRef}
                        //       {..._provided.draggableProps}
                        //       {..._provided.dragHandleProps}
                        //     />
                        //   );
                        // }

                        return (
                          <Grid
                            container
                            alignItems="center"
                            direction="column"
                            justify="space-around"
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                          >
                            { item.id.startsWith('day')
                              && (
                              <TravelDayBlock
                                items={this.state.items}
                                index={index + 1}
                                handleBlockInfo={handleBlockInfo}
                              />
                              )}
                            { item.id.startsWith('restaurant')
                              && (
                              <TravelActivityBlockEdit
                                title="Restaurant"
                                items={this.state.items}
                                index={index + 1}
                                handleRemove={handleRemove}
                                handleBlockInfo={handleBlockInfo}
                              />
                              )}
                            { item.id.startsWith('transportation')
                              && (
                              <TravelActivityBlockEdit
                                title="transportation"
                                items={this.state.items}
                                setItems={this.setItems}
                                index={index + 1}
                                handleRemove={handleRemove}
                                handleBlockInfo={handleBlockInfo}
                              />
                              )}
                            { item.id.startsWith('activity')
                              && (
                              <TravelActivityBlockEdit
                                title="Activity"
                                items={this.state.items}
                                setItems={this.setItems}
                                index={index + 1}
                                handleRemove={handleRemove}
                                handleBlockInfo={handleBlockInfo}
                              />
                              )}
                            { item.id.startsWith('hotel')
                              && (
                              <TravelActivityBlockEdit
                                title="Hotel"
                                items={this.state.items}
                                setItems={this.setItems}
                                index={index + 1}
                                handleRemove={handleRemove}
                                handleBlockInfo={handleBlockInfo}
                              />
                              )}
                            { item.id.startsWith('custom')
                              && (
                              <TravelCustomBlockEdit
                                items={this.state.items}
                                setItems={this.setItems}
                                index={index + 1}
                                handleRemove={handleRemove}
                                handleBlockInfo={handleBlockInfo}
                              />
                              )}
                          </Grid>
                        );
                      }}
                    </Draggable>
                  ))}
                </Grid>
                {provided.placeholder}
              </>
            )}
          </Droppable>
          <TagBlock tags={JSON.stringify(this.state.tags)} setTags={this.setTags} />
          <Grid style={getPaddingStyle()} />
          <Button
            id="create-travel-button"
            variant="contained"
            color="secondary"
            disabled={this.state.items.length === 0}
            onClick={this.handleClickCreate}
          >
            {this.props.mode === 'create' ? 'Create' : 'Edit'}
          </Button>
          <Grid style={getPaddingStyle()} />
          <Droppable droppableId="droppableButton" direction="horizontal">
            {(provided, snapshot) => (
              <Grid
                container
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getButtonDivStyle(snapshot.isDraggingOver)}
              >
                {provided.placeholder}
                <Draggable draggableId="restaurant" index={0}>
                  {(_provided, _snapshot) => {
                    const style = getFloatStyle(_snapshot.isDragging,
                      _provided.draggableProps.style, this.state.buttonDraggable);
                    return (
                      <>
                        <Fab style={getFabStyle('40%')}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                            style={style}
                          >
                            {_snapshot.isDragging
                              ? <AddIcon />
                              : <RestaurantIcon />}
                          </Box>
                        </Fab>
                        {!this.state.buttonDraggable && (
                        <Fab style={getFabStyle('40%')}>
                          <Grid item>
                            <RestaurantIcon />
                          </Grid>
                        </Fab>
                        )}
                      </>
                    );
                  }}
                </Draggable>
                <Draggable draggableId="transportation" index={1}>
                  {(_provided, _snapshot) => {
                    const style = getFloatStyle(_snapshot.isDragging,
                      _provided.draggableProps.style, this.state.buttonDraggable);
                    return (
                      <>
                        <Fab style={getFabStyle('50%')}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                            style={style}
                          >
                            {_snapshot.isDragging
                              ? <AddIcon />
                              : <DriveEtaIcon />}
                          </Box>
                        </Fab>
                        {!this.state.buttonDraggable && (
                        <Fab style={getFabStyle('50%')}>
                          <Grid item>
                            <DriveEtaIcon />
                          </Grid>
                        </Fab>
                        )}
                      </>
                    );
                  }}
                </Draggable>
                <Draggable draggableId="activity" index={2}>
                  {(_provided, _snapshot) => {
                    const style = getFloatStyle(_snapshot.isDragging,
                      _provided.draggableProps.style, this.state.buttonDraggable);
                    return (
                      <>
                        <Fab style={getFabStyle('60%')}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                            style={style}
                          >
                            {_snapshot.isDragging ? <AddIcon />
                              : <AccessibilityNewIcon />}
                          </Box>
                        </Fab>
                        {!this.state.buttonDraggable && (
                        <Fab style={getFabStyle('60%')}>
                          <Grid item>
                            <AccessibilityNewIcon />
                          </Grid>
                        </Fab>
                        )}
                      </>
                    );
                  }}
                </Draggable>
                <Draggable draggableId="hotel" index={3}>
                  {(_provided, _snapshot) => {
                    const style = getFloatStyle(_snapshot.isDragging,
                      _provided.draggableProps.style, this.state.buttonDraggable);
                    return (
                      <>
                        <Fab style={getFabStyle('70%')}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                            style={style}
                          >
                            {_snapshot.isDragging ? <AddIcon />
                              : <HotelIcon />}
                          </Box>
                        </Fab>
                        {!this.state.buttonDraggable && (
                        <Fab style={getFabStyle('70%')}>
                          <Grid item>
                            <HotelIcon />
                          </Grid>
                        </Fab>
                        )}
                      </>
                    );
                  }}
                </Draggable>
                <Draggable draggableId="custom" index={4}>
                  {(_provided, _snapshot) => {
                    const style = getFloatStyle(_snapshot.isDragging,
                      _provided.draggableProps.style, this.state.buttonDraggable);
                    return (
                      <>
                        <Fab style={getFabStyle('80%')}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                            style={style}
                          >
                            {_snapshot.isDragging ? <AddIcon />
                              : <ContactSupportIcon />}
                          </Box>
                        </Fab>
                        {!this.state.buttonDraggable && (
                        <Fab style={getFabStyle('80%')}>
                          <Grid item>
                            <ContactSupportIcon />
                          </Grid>
                        </Fab>
                        )}
                      </>
                    );
                  }}
                </Draggable>
              </Grid>
            )}
          </Droppable>

        </DragDropContext>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    header: state.travel.header,
    items: state.travel.items,
    tags: state.travel.tags,
    id: state.travel.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTravel: (travel, form_data) => dispatch(actionCreators.createTravel(travel, form_data)),
    // createTravel: (travel) => dispatch(actionCreators.createTravel(travel)),
    editTravel: (id, travel) => dispatch(actionCreators.editTravel(id, travel)),
    getTravel: (id, isEdit) => dispatch(actionCreators.getTravel(id, isEdit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateTravel));
