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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TravelHeaderBlockEdit from '../../components/travelblock/TravelHeaderBlockEdit';
import TravelTransportationBlockEdit from '../../components/travelblock/TravelTransportationBlockEdit';
import TravelCustomBlockEdit from '../../components/travelblock/TravelCustomBlockEdit';
import TravelActivityBlockEdit from '../../components/travelblock/TravelActivityBlockEdit';

const useFabStyles = makeStyles((theme) => ({
  transportation: {
    margin: theme.spacing(2),
    position: 'fixed',
    bottom: '1rem',
    right: '60%',
  },
  transportationIcon: {
    'font-size': '30px',
  },
  restaurant: {
    margin: theme.spacing(2),
    position: 'fixed',
    bottom: '1rem',
    right: '70%',
  },
  restaurantIcon: {
    'font-size': '30px',
  },
  activity: {
    margin: theme.spacing(2),
    position: 'fixed',
    bottom: '1rem',
    right: '50%',
  },
  activityIcon: {
    'font-size': '30px',
  },
  hotel: {
    margin: theme.spacing(2),
    position: 'fixed',
    bottom: '1rem',
    right: '40%',
  },
  hotelIcon: {
    'font-size': '30px',
  },
  custom: {
    margin: theme.spacing(2),
    position: 'fixed',
    bottom: '1rem',
    right: '30%',
  },
  customIcon: {
    'font-size': '30px',
  },
}));

const getItems = (count) => Array.from({ length: count }, (v, k) => k).map((k) => ({
  id: `item-${k}`,
}));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? 'white' : 'white',
  ...draggableStyle,
});

const getFloatStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? 'white' : '#11ffee00',

  width: isDragging ? 720 : 'inherit',
  height: isDragging ? 200 : 'inherit',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'white' : 'white',
  width: 720,
  minHeight: 300,
});

const getPaddingStyle = () => ({
  minHeight: 150,
});

export default function CreateTravel(props) {
  const fabClasses = useFabStyles();
  const [items, setItems] = useState(getItems(0));

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let pushItems = Array.from(items);
    if (result.draggableId === 'transportation') {
      pushItems.push({ id: `transportation-${result.source.index}` });
    } else if (result.draggableId === 'activity') {
      pushItems.push({ id: `activity-${result.source.index}` });
    } else if (result.draggableId === 'hotel') {
      pushItems.push({ id: `hotel-${result.source.index}` });
    } else if (result.draggableId === 'restaurant') {
      pushItems.push({ id: `restaurant-${result.source.index}` });
    } else if (result.draggableId === 'custom') {
      pushItems.push({ id: `custom-${result.source.index}` });
    } else {
      pushItems = items;
    }
    const newItems = reorder(
      pushItems,
      result.source.index,
      result.destination.index,
    );
    setItems(newItems);
  };

  const getMaxItemIndex = () => {
    return items.length;
  };

  return (
    <Grid container alignItems="center" direction="column" justify="space-around">
      <Grid container alignItems="center" direction="column" justify="space-around">
        <TravelHeaderBlockEdit />
      </Grid>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
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
                    {(_provided, _snapshot) => (
                      <Grid
                        container
                        alignItems="center"
                        direction="column"
                        justify="space-around"
                        ref={_provided.innerRef}
                        {..._provided.draggableProps}
                        {..._provided.dragHandleProps}
                        style={getItemStyle(
                          _snapshot.isDragging,
                          _provided.draggableProps.style,
                        )}
                      >
                        { item.id.startsWith('restaurant')
                          && <TravelActivityBlockEdit title="Restaurant" />}
                        { item.id.startsWith('transportation')
                          && <TravelTransportationBlockEdit />}
                        { item.id.startsWith('activity')
                          && <TravelActivityBlockEdit title="Activity" /> }
                        { item.id.startsWith('hotel')
                          && <TravelActivityBlockEdit title="Hotel" /> }
                        { item.id.startsWith('custom')
                          && <TravelCustomBlockEdit />}
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button variant="contained" color="secondary" disabled={items.length === 0}>
                  Create
                </Button>
                <Grid style={getPaddingStyle()} />

              </Grid>
              <>
                <Draggable draggableId="restaurant" index={getMaxItemIndex()}>
                  {(_provided, _snapshot) => (
                    <Fab className={fabClasses.restaurant}>
                      <Grid
                        item
                        ref={_provided.innerRef}
                        {..._provided.draggableProps}
                        {..._provided.dragHandleProps}
                      >
                        <RestaurantIcon className={fabClasses.restaurantIcon} />
                      </Grid>
                    </Fab>
                  )}
                </Draggable>
                <Draggable draggableId="transportation" index={getMaxItemIndex()}>
                  {(_provided, _snapshot) => (
                    <Fab className={fabClasses.transportation}>
                      <Grid
                        item
                        ref={_provided.innerRef}
                        {..._provided.draggableProps}
                        {..._provided.dragHandleProps}
                      >
                        <DriveEtaIcon className={fabClasses.transportationIcon} />
                      </Grid>
                    </Fab>
                  )}
                </Draggable>
                <Draggable draggableId="activity" index={getMaxItemIndex()}>
                  {(_provided, _snapshot) => (
                    <Fab className={fabClasses.activity}>
                      <Grid
                        item
                        ref={_provided.innerRef}
                        {..._provided.draggableProps}
                        {..._provided.dragHandleProps}
                      >
                        <AccessibilityNewIcon className={fabClasses.activityIcon} />
                      </Grid>
                    </Fab>
                  )}
                </Draggable>
                <Draggable draggableId="hotel" index={getMaxItemIndex()}>
                  {(_provided, _snapshot) => (
                    <Fab className={fabClasses.hotel}>
                      <Grid
                        item
                        ref={_provided.innerRef}
                        {..._provided.draggableProps}
                        {..._provided.dragHandleProps}
                      >
                        <HotelIcon className={fabClasses.hotelIcon} />
                      </Grid>
                    </Fab>
                  )}
                </Draggable>
                <Draggable draggableId="custom" index={getMaxItemIndex()}>
                  {(_provided, _snapshot) => (
                    <Fab className={fabClasses.custom}>
                      <Grid
                        item
                        ref={_provided.innerRef}
                        {..._provided.draggableProps}
                        {..._provided.dragHandleProps}
                      >
                        <ContactSupportIcon className={fabClasses.customIcon} />
                      </Grid>
                    </Fab>
                  )}
                </Draggable>
              </>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  );
}
