import axios from "axios";
import React, { useState, useEffect } from "react";
import { Component } from "./components/MoveableComponent";

const App = () => {

  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cont,setCont] = useState(0);
  const [photos,setPhotos] = useState([]);
  
  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];
    getPhotosFromApi();

    console.log(photos)

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        image:photos[cont]?.url,
        updateEnd: true,
      }
    ]);
    setCont(cont+1);
  };

  const removeComponents =(id)=>{

    const newComponents = moveableComponents.filter(moveableComponent=>moveableComponent.id !== id)
    setMoveableComponents(newComponents);
    
  }
 
  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  const getPhotosFromApi = async()=>{

      try {
        const randomNumber = Math.trunc(Math.random() * (5000 - 1) + 1);
        const {data} = await axios(`https://jsonplaceholder.typicode.com/photos/${randomNumber}`);
        setPhotos([...photos,{url:data.url}])
      } catch (error) {
        console.log(error)
      }
      

  }

  useEffect(()=>{
    getPhotosFromApi();
  },[]);

  return (
    <main style={{ height : "100vh", width: "100vw" }}>
      <button onClick={addMoveable}>Add Moveable1</button>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
          overflow:"hidden"
        }}
      >
        {moveableComponents.map((item, index) => (
          <Component
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
            removeComponents={removeComponents}
            cont={cont}
          />
        ))}
      </div>
    </main>
  );
};

export default App;


