import React, { useState } from 'react';
import './styles.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const MediaPlayer = (props) => {
  const { list, type, userId, displayedName } = props;
  const [selectedItem, setSelectedItem] = useState(0);
  const next = () => {
    setSelectedItem(selectedItem + 1);
  };

  const prev = () => {
    setSelectedItem(selectedItem - 1);
  };

  const updateCurrentSlide = (index) => {
    if (selectedItem !== index) {
      setSelectedItem(index);
    }
  };

  const renderPhotoList = () => list.map((el, index) => <div key={index}><img src={'http://localhost:8001/files/' + el.path}/></div>);

  const renderList = () => {
    if(type === 'photos') return renderPhotoList();
  };

  return (
    <>
      {
        list.length ?
          <>
            <p>{selectedItem + 1} из {list.length}</p>
            <Carousel
              autoPlay={false}
              selectedItem={selectedItem}
              onChange={updateCurrentSlide}
            >
              {renderList()}
              
            </Carousel>
            {
              +list[selectedItem].senderId === +userId ?
                <div>{displayedName}</div> :
                <div>Ты</div>
            }
            <div>{list[selectedItem].createdAt}</div>
          </> :
          null
      }

    </>
  );
};


export default MediaPlayer;