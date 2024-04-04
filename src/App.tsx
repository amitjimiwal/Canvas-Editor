import { useEffect, useRef } from "react";
import "./App.css";
const data = {
  caption: {
    text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
    position: {
      x: 50,
      y: 50,
    },
    max_characters_per_line: 31,
    font_size: 44,
    alignment: "left",
    text_color: "#FFFFFF",
  },
  cta: {
    text: "ShopNow",
    position: {
      x: 190,
      y: 320,
    },
    text_color: "#FFFFFF",
    background_color: "#BE2D0F",
  },
  image_mask: {
    x: 56,
    y: 442,
    width: 970,
    height: 600,
  },
  urls: {
    mask: "https://res.cloudinary.com/dejzy9q65/image/upload/v1707928921/logo_lmq9jl.png",
    stroke:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
    design_pattern:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
  },
};

class Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  data = data;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
  }
  draw() {
    const { caption, cta, image_mask, urls } = data;
    const { canvas, context } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = cta.background_color;
    context.fillRect(0, 0, canvas.width, canvas.height);

    //text
    context.fillStyle = caption.text_color;
    context.textAlign = caption.alignment as CanvasTextAlign;
    context.font = `${caption.font_size}px Arial`;
    //images and strokes
    const pattern = new Image();
    pattern.src = urls.design_pattern;
    pattern.onload = function () {
      context.drawImage(pattern, 0, 0);
      context.strokeStyle = "white"; // Border color
      context.lineWidth = 5; // Border width
      context.strokeRect(
        image_mask.x,
        image_mask.y,
        image_mask.width,
        image_mask.height
      );
    };
    const img = new Image();
    img.src = urls.mask;
    img.onload = function () {
      context.globalCompositeOperation = "source-over";
      context.drawImage(
        img,
        image_mask.x,
        image_mask.y,
        image_mask.width,
        image_mask.height
      );
      context.strokeStyle = "white"; // Border color
      context.lineWidth = 5; // Border width
      context.strokeRect(
        image_mask.x,
        image_mask.y,
        image_mask.width,
        image_mask.height
      );
    };
  }
}
function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasInstance = new Canvas(canvas);
      canvasInstance.draw();
    }
  }, []);
  return (
    <div className="bg-blue-300 w-screen min-h-screen">
      <canvas ref={canvasRef} height="1080" width="1080"></canvas>
    </div>
  );
}

export default App;
