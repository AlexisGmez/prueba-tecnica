import { useRef,useState } from "react";
import Moveable from "react-moveable";
export const Component = ({
    updateMoveable,
    top,
    left,
    width,
    height,
    index,
    color,
    id,
    setSelected,
    isSelected = false,
    updateEnd,
    photos,
    cont,
    removeComponents
  }) => {

    const ref = useRef();
    const [frame, setFrame] = useState({
        translate: [0,0],
    });
    const [nodoReferencia, setNodoReferencia] = useState({
      top,
      left,
      width,
      height,
      index,
      color,
      id,
    });
  
    let parent = document.getElementById("parent");
    let parentBounds = parent.getBoundingClientRect();
    
    const onResizeStart = (e) =>{
        e.setOrigin(["%", "%"]);
        e.dragStart && e.dragStart.set(frame.translate);
    }

    const onResize =(e)=>{
        const beforeTranslate = e.drag.beforeTranslate;
        frame.translate = beforeTranslate;
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }

    return (
      <>
        <div
          ref={ref}
          className="draggable"
          id={"component-" + id}
          style={{
            position: "absolute",
            top: top,
            left: left,
            width: width,
            height: height,
            // backgroundImage: `url(${photos[cont]?.url})`,
            backgroundColor:color,
            // backgroundSize:'100%',
          }}
          onClick={() => setSelected(id)}
          onDoubleClick={()=>removeComponents(id)}
        />
  
        <Moveable
          target={isSelected && ref.current}
          resizable
          draggable
          onDrag={(e) => {
            updateMoveable(id, {
              top: e.top,
              left: e.left,
              width,
              height,
              color,
            });
          }}
          onResizeStart={onResizeStart}
          onResize={onResize}  
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={false}
          zoom={1}
          origin={true}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        />
      </>
    );
  };