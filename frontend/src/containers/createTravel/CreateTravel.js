import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HotelIcon from '@material-ui/icons/Hotel';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Box from '@material-ui/core/Box';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TravelHeaderBlockEdit from '../../components/travelblock/TravelHeaderBlockEdit';
import TravelTransportationBlockEdit from '../../components/travelblock/TravelTransportationBlockEdit';
import TravelCustomBlockEdit from '../../components/travelblock/TravelCustomBlockEdit';
import TravelActivityBlockEdit from '../../components/travelblock/TravelActivityBlockEdit';
import TravelRemoveBlock from '../../components/travelblock/TravelRemoveBlock';
import TravelDayBlock from '../../components/travelblock/TravelDayBlock';


const useFabStyles = makeStyles((theme) => ({
  transportation: {
    margin: theme.spacing(2),
    position: 'fixed',
    left: '3rem',
    top: '40%',
  },
  transportationIcon: {
    'font-size': '30px',
  },
  restaurant: {
    margin: theme.spacing(2),
    position: 'fixed',
    left: '3rem',
    top: '30%',
  },
  restaurantIcon: {
    'font-size': '30px',
  },
  activity: {
    margin: theme.spacing(2),
    position: 'fixed',
    left: '3rem',
    top: '50%',
  },
  activityIcon: {
    'font-size': '30px',
  },
  hotel: {
    margin: theme.spacing(2),
    position: 'fixed',
    left: '3rem',
    top: '60%',
  },
  hotelIcon: {
    'font-size': '30px',
  },
  custom: {
    margin: theme.spacing(2),
    position: 'fixed',
    left: '3rem',
    top: '70%',
  },
  customIcon: {
    'font-size': '30px',
  },
  remove: {
    margin: theme.spacing(2),
    position: 'fixed',
    left: '3rem',
    top: '80%',
  },
  removeIcon: {
    'font-size': '30px',
  },
}));

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
  // width: '30%',
  // minHeight: '70%',
});

const getRemoveDivStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? 'red' : 'green',
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '10%',
  minHeight: '30%',
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

const removeItem = (list, index) => {
  const result = Array.from(list);
  result.splice(index, 1);
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

export default function CreateTravel(props) {
  const fabClasses = useFabStyles();
  const [buttonDraggable, setButtonDraggable] = useState(true);
  const [removeDraggable, setRemoveDraggable] = useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const initItem = {
    id: 'day-0',
    info: {
      datetime: new Date(startDate),
      title: '',
      expand: true,
    },
  };
  const [items, setItems] = useState(props.items || [initItem]);
  const [travelTitle, setTravelTitle] = React.useState('Travel Title');

  const getMaxItemIndex = () => {
    return items.length;
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
      setItems(itemlist);
    };
  };

  const handleExpandClick = (index, _expand) => {
    const newItems = items.map(
      (item, idx) => ((index === idx)
        ? { ...item, info: { ...item.info, expand: !_expand } }
        : item),
    );
    setItems(newItems);
  };

  const handleDayBlockTitle = (index, title) => {
    const newItems = items.map(
      (item, idx) => ((index === idx)
        ? { ...item, info: { ...item.info, title: title } }
        : item),
    );
    setItems(newItems);
  };

  const onBeforeDragStart = (event) => {
    setButtonDraggable(false);
  };

  const onDragUpdate = (result) => {
    if (result.destination && result.destination.droppableId === 'droppableRemove') {
      setRemoveDraggable(true);
    } else {
      setRemoveDraggable(false);
    }
  };

  const onDragEnd = (result) => {
    setButtonDraggable(true);
    if (!result.destination) {
      return;
    }

    let pushItems = Array.from(items);
    if (result.destination.droppableId === 'droppableRemove'
      && result.source.droppableId === 'droppableList') {
      setItems(removeItem(pushItems, result.source.index));
      return;
    }

    const maxId = getMaxItemIndex();
    let sourceIndex = maxId;
    if (result.draggableId === 'transportation') {
      pushItems.push({ id: `transportation-${maxId}`, info: {} });
    } else if (result.draggableId === 'activity') {
      pushItems.push({ id: `activity-${maxId}`, info: {} });
    } else if (result.draggableId === 'hotel') {
      pushItems.push({ id: `hotel-${maxId}`, info: {} });
    } else if (result.draggableId === 'restaurant') {
      pushItems.push({ id: `restaurant-${maxId}`, info: {} });
    } else if (result.draggableId === 'custom') {
      pushItems.push({ id: `custom-${maxId}`, info: {} });
    } else {
      sourceIndex = result.source.index;
      pushItems = items;
    }
    const newItems = reorder(
      pushItems,
      sourceIndex,
      result.destination.index > 0 ? result.destination.index : 1,
    );
    setItems(newItems);
  };

  return (
    <Grid container alignItems="center" direction="column" justify="space-around">
      <Grid container alignItems="center" direction="column" justify="space-around">
        <TravelHeaderBlockEdit
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          travelTitle={travelTitle}
          setTravelTitle={setTravelTitle}
          handlePeriodChange={handlePeriodChange(items, setItems)}
        />
      </Grid>
      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragUpdate={onDragUpdate}
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
                    items={items}
                    index={0}
                    handleExpandClick={handleExpandClick}
                    handleDayBlockTitle={handleDayBlockTitle}
                  />
                </Grid>
                {items.slice(1).map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index + 1} isDragDisabled={item.id.startsWith('day')}>
                    {(_provided, _snapshot) => {
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
                              items={items}
                              index={index + 1}
                              handleExpandClick={handleExpandClick}
                              handleDayBlockTitle={handleDayBlockTitle}
                            />
                            )}
                          { item.id.startsWith('restaurant') && (!_snapshot.isDragging || !removeDraggable)
                            && (
                            <TravelActivityBlockEdit
                              title="Restaurant"
                              items={items}
                              setItems={setItems}
                              index={index + 1}
                            />
                            )}
                          { item.id.startsWith('transportation') && (!_snapshot.isDragging || !removeDraggable)
                            && (
                            <TravelTransportationBlockEdit
                              items={items}
                              setItems={setItems}
                              index={index + 1}
                            />
                            )}
                          { item.id.startsWith('activity') && (!_snapshot.isDragging || !removeDraggable)
                            && (
                            <TravelActivityBlockEdit
                              title="Activity"
                              items={items}
                              setItems={setItems}
                              index={index + 1}
                            />
                            )}
                          { item.id.startsWith('hotel') && (!_snapshot.isDragging || !removeDraggable)
                            && (
                            <TravelActivityBlockEdit
                              title="Hotel"
                              items={items}
                              setItems={setItems}
                              index={index + 1}
                            />
                            )}
                          { item.id.startsWith('custom') && (!_snapshot.isDragging || !removeDraggable)
                            && (
                            <TravelCustomBlockEdit
                              items={items}
                              setItems={setItems}
                              index={index + 1}
                            />
                            )}
                          { _snapshot.isDragging && removeDraggable
                            && <TravelRemoveBlock />}
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
        <Grid style={getPaddingStyle()} />
        <Button variant="contained" color="secondary" disabled={items.length === 0}>
          Create
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
                    _provided.draggableProps.style, buttonDraggable);
                  return (
                    <>
                      <Fab className={fabClasses.restaurant}>
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
                            ? <AddIcon className={fabClasses.restaurantIcon} />
                            : <RestaurantIcon className={fabClasses.restaurantIcon} />}
                        </Box>
                      </Fab>
                      {!buttonDraggable && (
                        <Fab className={fabClasses.restaurant}>
                          <Grid item>
                            <RestaurantIcon className={fabClasses.restaurantIcon} />
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
                    _provided.draggableProps.style, buttonDraggable);
                  return (
                    <>
                      <Fab className={fabClasses.transportation}>
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
                            ? <AddIcon className={fabClasses.transportationIcon} />
                            : <DriveEtaIcon className={fabClasses.transportationIcon} />}
                        </Box>
                      </Fab>
                      {!buttonDraggable && (
                        <Fab className={fabClasses.transportation}>
                          <Grid item>
                            <DriveEtaIcon className={fabClasses.transportationIcon} />
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
                    _provided.draggableProps.style, buttonDraggable);
                  return (
                    <>
                      <Fab className={fabClasses.activity}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          ref={_provided.innerRef}
                          {..._provided.draggableProps}
                          {..._provided.dragHandleProps}
                          style={style}
                        >
                          {_snapshot.isDragging ? <AddIcon className={fabClasses.activityIcon} />
                            : <AccessibilityNewIcon className={fabClasses.activityIcon} />}
                        </Box>
                      </Fab>
                      {!buttonDraggable && (
                        <Fab className={fabClasses.activity}>
                          <Grid item>
                            <AccessibilityNewIcon className={fabClasses.activityIcon} />
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
                    _provided.draggableProps.style, buttonDraggable);
                  return (
                    <>
                      <Fab className={fabClasses.hotel}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          ref={_provided.innerRef}
                          {..._provided.draggableProps}
                          {..._provided.dragHandleProps}
                          style={style}
                        >
                          {_snapshot.isDragging ? <AddIcon className={fabClasses.hotelIcon} />
                            : <HotelIcon className={fabClasses.hotelIcon} />}
                        </Box>
                      </Fab>
                      {!buttonDraggable && (
                        <Fab className={fabClasses.hotel}>
                          <Grid item>
                            <HotelIcon className={fabClasses.hotelIcon} />
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
                    _provided.draggableProps.style, buttonDraggable);
                  return (
                    <>
                      <Fab className={fabClasses.custom}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          ref={_provided.innerRef}
                          {..._provided.draggableProps}
                          {..._provided.dragHandleProps}
                          style={style}
                        >
                          {_snapshot.isDragging ? <AddIcon className={fabClasses.customIcon} />
                            : <ContactSupportIcon className={fabClasses.customIcon} />}
                        </Box>
                      </Fab>
                      {!buttonDraggable && (
                        <Fab className={fabClasses.custom}>
                          <Grid item>
                            <ContactSupportIcon className={fabClasses.customIcon} />
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

        <Droppable droppableId="droppableRemove" direction="horizontal">
          {(provided, snapshot) => (
            <Grid
              container
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getRemoveDivStyle(snapshot.isDraggingOver)}
            >
              {provided.placeholder}
              <Fab className={fabClasses.remove}>
                <DeleteForeverIcon className={fabClasses.removeIcon} />
              </Fab>
            </Grid>
          )}
        </Droppable>

      </DragDropContext>
    </Grid>
  );
}
