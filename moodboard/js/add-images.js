window.addEventListener('load', function() {
  WebFont.load({
    google: {
      families: ['Cookie', 'Cormorant','Dancing Script', 'Homemade Apple', 'Inknut Antiqua', 'Inconsolata',
                 'Josefin Sans', 'Lora', 'Pacifico', 'Playfair Display', 'Quicksand', 'Roboto', 'Roboto Slab',
                 'Sacramento', 'Satisfy']
    }
  });

  var canvas = new fabric.Canvas('moodCanvas');
    canvas.setWidth(750);
    canvas.setHeight(750);

  // Switch to different sizing of canvas
  var layouts = ['Choose a layout','Square', 'Rectangle'];
  var boardSelector = document.getElementById('boardSize');
  layouts.forEach(function(layout) {
    var option = document.createElement('option');
    option.innerHTML = layout;
    option.value = layout;
    if(layout === 'Square') {
      option.selected = "selected";
    }
    boardSelector.appendChild(option);
  });

  // Apply selected size on change
  document.getElementById('boardSize').onchange = function() {
    if(this.value === 'Square') {
      canvas.discardActiveObject();
      var allObjects = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
      });
      var scale = 1;
      var newWidth = allObjects.width*scale;
      var newHeight = allObjects.height*scale;
      canvas.setWidth(750);
      canvas.setHeight(750);
      allObjects.set({left: 10, top: 10});
      allObjects.setCoords();
      allObjects.scaleToWidth(newWidth).scaleToHeight(newHeight);
      canvas.requestRenderAll();
    } else if (this.value === 'Rectangle') {
      canvas.discardActiveObject();
      var allObjects = canvas.getObjects();
      var scale = 0.6667;
      var newWidth = allObjects.width*scale;
      var newHeight = allObjects.height*scale;
      canvas.setWidth(500);
      canvas.setHeight(750);
      allObjects.setLeft(10);
      allObjects.setTop(10);
      allObjects.scaleToWidth(newWidth).scaleToHeight(newHeight);
      allObjects.setCoords();
      canvas.requestRenderAll();
    }
  };
    
  // Upload and place images in slots on Add images section
  var imageInputs = document.querySelectorAll('.image-input');
  imageInputs.forEach(function(element) {
      element.addEventListener('change', function() {
      var parent = element.parentNode;
      var parentId = parent.id;
      if (this.files && this.files[0]) {
            var img = document.createElement('img');
            img.addEventListener("dblclick", loadImageToCanvas);
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            document.getElementById(parentId).appendChild(img);
        }
        this.style.display = "none";
    })
  });

  // Load an image onto the canvas when double clicked by user
  function loadImageToCanvas() {
    var imgElement = this;
    var imgInstance = new fabric.Image(imgElement, {
      left: 10,
      top: 10,
    });
    canvas.add(imgInstance);
    canvas.requestRenderAll();
  }

  // Set palette shapes
  var shapes = ['Circle', 'Square', 'Triangle'];
  var paletteShape = document.getElementById('paletteShape');
  shapes.forEach(function(shape) {
    var option = document.createElement('option');
    option.innerHTML= shape;
    option.value = shape;
    paletteShape.appendChild(option);
  });
  
  
  var loadPalette = document.getElementById("loadSelectedPalette");
  loadPalette.addEventListener('click', function() {
    // get the colours to use
    var swatches = document.querySelectorAll('.swatch-wrap');
    var colours;
    // load each colour as selected swatch type
    var selectedPaletteShape = document.getElementById('paletteShape');
    var shape = selectedPaletteShape.options[selectedPaletteShape.selectedIndex].text;
    var startX = 20;
    var count = 0;
    swatches.forEach(function(swatch) {
      var colour = swatch.children[0].jscolor;
      if(shape === 'Circle') {
        canvas.add(new fabric.Circle({
          left: (75*count)+20,
          top: 10,
          fill: '#' + colour,
          radius: 35
        }));
      }
      else if(shape === 'Square') {
        canvas.add(new fabric.Rect({
          left: (75*count)+50,
          top: 10,
          fill: '#' + colour,
          width: 75,
          height: 75
        }));
      }
      else if(shape === 'Triangle') {
        canvas.add(new fabric.Triangle({
          left: (75*count)+50,
          top: 10,
          fill: '#' + colour,
          width: 75,
          height: 75
        }));
      }
      count++;
    });
  });


  // Add a Textbox using a custom font
  var addTextButton = document.getElementById("addTextButton");
  addTextButton.addEventListener("click", function() {
    var textbox = new fabric.Textbox('Enter your text here', { 
      left: 50,
      top: 50,
      width: 150,
      fontFamily: 'Cookie',
      fontSize: 20
    });
    canvas.add(textbox).setActiveObject(textbox);
    var textTools = document.getElementById('displayTextTools');
    textTools.style.display = "block";
  });
  
  // Add text to canvas
  // Define an array with all fonts
  var fonts = [
    'Cookie', 
    'Cormorant', 
    'Dancing Script', 
    'Homemade Apple',
    'Inconsolata',
    'Inknut Antiqua',
    'Josefin Sans',
    'Lora', 
    'Pacifico', 
    'Playfair Display', 
    'Quicksand', 
    'Roboto', 
    'Roboto Slab', 
    'Sacramento', 
    'Satisfy', 
  ];

  var select = document.getElementById("font-family");
  fonts.forEach(function(font) {
    var option = document.createElement('option');
    option.innerHTML = font;
    option.value = font;
    if(font === 'Cookie') {
      option.selected = "selected";
    }
    select.appendChild(option);
  });

  // Apply selected font on change
  document.getElementById('font-family').onchange = function() {
    canvas.getActiveObject().set("fontFamily", this.value);
    canvas.requestRenderAll();
  };

  // Set font size
  var sizes = [10,12,14,16,18,20,22,24,32,36,42,48,56,64,72];
  var sizeSelect = document.getElementById('font-size');
  sizes.forEach(function(size) {
    var option = document.createElement('option');
    option.innerHTML = size;
    option.value = size;
    if(size === 20) {
      option.selected = "selected";
    }
    sizeSelect.appendChild(option);
  });
  // Apply selected size on change
  document.getElementById('font-size').onchange = function() {
    canvas.getActiveObject().set("fontSize", this.value);
    canvas.requestRenderAll();
  };
  
  // Align text in selected object
  var textAlignments = document.querySelectorAll('.click-text');
  textAlignments.forEach(function(element) {
    element.addEventListener("click", function() {
      canvas.getActiveObject().set("textAlign", this.getAttribute('value'));
      canvas.requestRenderAll();
    });
  });
  
  // Set option to change text color
  var textColorizer = document.getElementById('selectTextColour');
  textColorizer.addEventListener("change", function() {
    var selectedColour = this.jscolor.toHEXString();
    canvas.getActiveObject().set("fill", selectedColour);
    canvas.requestRenderAll();
  });

  // Add a circle
  var addCircle = document.getElementById("selectCircle");
  addCircle.addEventListener("dblclick", function() {
    canvas.add(new fabric.Circle({
      left: 10,
      top: 10,
      fill: '#24bddf',
      radius: 50
    }));
  });
  
  // Add a square
  var addSquare = document.getElementById("selectSquare");
  addSquare.addEventListener("dblclick", function() {
    canvas.add(new fabric.Rect({
      left: 10,
      top: 10,
      fill: '#035177',
      width: 50,
      height: 50
    }));
  });
  
  // Add a triangle
  var addTriangle = document.getElementById("selectTriangle");
  addTriangle.addEventListener("dblclick", function() {
    canvas.add(new fabric.Triangle({
      left: 10,
      top: 10,
      fill: '#24bddf',
      width: 50,
      height: 50
    }));
  });
  
  // Add a line
  var addLine = document.getElementById("selectLine");
  addLine.addEventListener("dblclick", function() {
    canvas.add(new fabric.Line([ 0, 100, 200, 200], {
      left: 10,
      top: 10,
      stroke: '#035177',
    }));
  });
  
  // Set shape colour
  var shapeColour = document.getElementById("shapeColour");
  shapeColour.addEventListener('change', function() {
    var object = canvas.getActiveObject();
    object.set('fill', '#' + this.jscolor);
    canvas.requestRenderAll();
  });  
  // Set shape opacity
  var shapeOpacity = document.getElementById("shapeOpacity");
  shapeOpacity.addEventListener("change", function() {
    var object = canvas.getActiveObject();
    object.set('opacity', parseInt(this.value, 10) / 100);
    canvas.requestRenderAll();
  });  
  
  // Set line colour
  var selectLineColour = document.getElementById("lineColour");
  selectLineColour.addEventListener('change', function() {
    var object = canvas.getActiveObject();
    object.set('stroke', '#' + this.jscolor);
    canvas.requestRenderAll();
  });  
  
  // Set line weight
  var lineWeight = document.getElementById("lineWeight");
  lineWeight.addEventListener("change", function() {
    var object = canvas.getActiveObject();
    object.set('strokeWidth', parseInt(this.value, 10));
    canvas.requestRenderAll();
  });  

  // 
  // Horizontal top toolbar
  //

  // Send to back
  var toBack = document.getElementById("sendToBack");
  toBack.addEventListener("click", function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendToBack(activeObject);
      canvas.requestRenderAll();
    }
  });
  
  // Send back one
  var backOne = document.getElementById("sendBackOne");
  backOne.addEventListener("click", function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendBackwards(activeObject);
      canvas.requestRenderAll();
    }
  });
  
  // Send forward one
  var forwardOne = document.getElementById("sendForwardOne");
  forwardOne.addEventListener("click", function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringForward(activeObject);
      canvas.requestRenderAll();
    }
  });
  
  // Send to front
  var toFront = document.getElementById("sendToFront");
  toFront.addEventListener("click", function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringToFront(activeObject);
      canvas.requestRenderAll();
    }
  });

  // Quick resize objects
  var percentageSizes = [10, 25, 50, 75, 90, 100, 110, 125, 150, 175, 200];
  var objectSizer = document.getElementById('objectSize');
  percentageSizes.forEach(function(size) {
    var option = document.createElement('option');
    option.innerHTML = size;
    option.value = size;
    if(size === 100) {
      option.selected = "selected";
    }
    objectSizer.appendChild(option);
  });
  // Apply selected size on change
  document.getElementById('objectSize').onchange = function() {
    var scale = this.value/100;
    var object = canvas.getActiveObject();
    var newWidth = object.width*scale;
    var newHeight = object.height*scale;
    object.scaleToWidth(newWidth).scaleToHeight(newHeight);
    canvas.requestRenderAll();
  };
  
  // Delete a selected object
  var deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(function(element) {
    element.addEventListener("click", function() {
      var activeObjects = canvas.getActiveObjects();
      canvas.discardActiveObject();
      if (activeObjects.length) {
        canvas.remove.apply(canvas, activeObjects);
      } 
      canvas.requestRenderAll();
      });
  });
  
  // Clear all objects from the canvas
  var clearButtons = document.querySelectorAll('.clear-button');
  clearButtons.forEach(function(element) {
    element.addEventListener("click", function() {
      var allObjects = canvas.getObjects();
      canvas.remove.apply(canvas, allObjects);
      canvas.requestRenderAll();
      });
  });

  // Set image download size as .jpeg
  var link = document.createElement('a');
  link.innerHTML = 'Download .jpeg';
  link.addEventListener('click', function(ev) {
    canvas.setBackgroundColor('rgba(255, 255, 255, 1)', canvas.renderAll.bind(canvas));
    // Use zoom to increase relative size to scale suitable for Instagram/Pinterest
    var instagram = 1.44;
    var pinterest = 2.206;
    var sizeSelection = document.getElementById('boardSize');
    if(sizeSelection.value === 'Square') {
      link.href = canvas.toDataURL({multiplier: instagram});
    } else if(sizeSelection.value === 'Rectangle') {
      link.href = canvas.toDataURL({multiplier: pinterest});
    }
    link.download = "mymoodboard.jpg";
  }, false);
  document.getElementById('saveJpegButton').appendChild(link);

  // Set image download as png
  var linkpng = document.createElement('a');
  linkpng.innerHTML = 'Download .png';
  linkpng.addEventListener('click', function(ev) {
    canvas.setBackgroundColor('rgba(255, 255, 255, 0)', canvas.renderAll.bind(canvas));
    var instagram = 1.44;
    var pinterest = 2.206;
    var sizeSelection = document.getElementById('boardSize');
    if(sizeSelection.value === 'Square') {
      linkpng.href = canvas.toDataURL({multiplier: instagram});
    } else if(sizeSelection.value === 'Rectangle') {
      linkpng.href = canvas.toDataURL({multiplier: pinterest});
    }
    linkpng.download = "mymoodboard.png";
  }, false);
  document.getElementById('savePngButton').appendChild(linkpng);

});