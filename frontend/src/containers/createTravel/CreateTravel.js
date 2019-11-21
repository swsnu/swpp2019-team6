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

export function getItems(count) {
  console.log('getItems', count);
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
  }));
}

// export const getItems = (count) => Array.from({ length: count }, (v, k) => k).map((k) => ({
//   id: `item-${k}`,
// }));

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
  width: '30%',
  minHeight: '70%',
});

const getRemoveDivStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'red' : 'green',
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '30%',
  minHeight: '30%',
});

const getPaddingStyle = () => ({
  minHeight: 150,
});

export default function CreateTravel(props) {
  const fabClasses = useFabStyles();
  const [items, setItems] = useState(props.items || getItems(0));
  const [buttonDraggable, setButtonDraggable] = useState(true);
  const [removeDraggable, setRemoveDraggable] = useState(false);
  // if (props.items) {
  //   setItems(props.items);
  // }
  console.log(items, buttonDraggable);
  const getMaxItemIndex = () => {
    return items.length;
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
      pushItems.push({ id: `transportation-${maxId}` });
    } else if (result.draggableId === 'activity') {
      pushItems.push({ id: `activity-${maxId}` });
    } else if (result.draggableId === 'hotel') {
      pushItems.push({ id: `hotel-${maxId}` });
    } else if (result.draggableId === 'restaurant') {
      pushItems.push({ id: `restaurant-${maxId}` });
    } else if (result.draggableId === 'custom') {
      pushItems.push({ id: `custom-${maxId}` });
    } else {
      sourceIndex = result.source.index;
      pushItems = items;
    }
    const newItems = reorder(
      pushItems,
      sourceIndex,
      result.destination.index,
    );
    setItems(newItems);
  };

  return (
    <Grid container alignItems="center" direction="column" justify="space-around">
      <Grid container alignItems="center" direction="column" justify="space-around">
        <TravelHeaderBlockEdit />
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
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                          { item.id.startsWith('restaurant') && (!_snapshot.isDragging || !removeDraggable)
                            && <TravelActivityBlockEdit title="Restaurant" />}
                          { item.id.startsWith('transportation') && (!_snapshot.isDragging || !removeDraggable)
                            && <TravelTransportationBlockEdit />}
                          { item.id.startsWith('activity') && (!_snapshot.isDragging || !removeDraggable)
                            && <TravelActivityBlockEdit title="Activity" /> }
                          { item.id.startsWith('hotel') && (!_snapshot.isDragging || !removeDraggable)
                            && <TravelActivityBlockEdit title="Hotel" /> }
                          { item.id.startsWith('custom') && (!_snapshot.isDragging || !removeDraggable)
                            && <TravelCustomBlockEdit />}
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
                  console.log("test", _snapshot);
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
