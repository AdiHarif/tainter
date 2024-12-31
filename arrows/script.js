
// Function to draw an SVG line looping back
function drawLoopingLine(targetElement) {
  // Get the element's bounding rectangle
  const rect = targetElement.getBoundingClientRect();

  // Determine the start point (e.g., center of the element's top edge)
  const anchorX = rect.right;
  const anchorY = rect.top + rect.height / 2;

  const startX = anchorX + 20;
  const startY = anchorY - 10;

  const endX = anchorX + 20;
  const endY = anchorY + 10;

  // Create an SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", window.innerWidth);
  svg.setAttribute("height", window.innerHeight);
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.pointerEvents = "none"; // Ensures the SVG does not interfere with user interactions

  // Create the path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  // Define the looping path using an SVG path string
  const controlPoint1X = anchorX + 75; // Control point for the curve (to the right)
  const controlPoint1Y = anchorY - 50; // Control point for the curve (above the start)
  const controlPoint2X = anchorX + 75; // Second control point for the curve (to the left)
  const controlPoint2Y = anchorY + 50; // Second control point for the curve (above the start)

  const pathData = `
      M ${startX} ${startY}
      C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}
  `;

  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "white");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-dasharray", "5, 5");

  // Create a text element for the label
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("fill", "white");
  text.textContent = "Branch Join";
  text.setAttribute("x", anchorX + 70);
  text.setAttribute("y", anchorY);

  // Append the text to the SVG
  svg.appendChild(text);

  // Create an arrowhead marker
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "5");
  marker.setAttribute("markerHeight", "3.5");
  marker.setAttribute("refX", "5");
  marker.setAttribute("refY", "1.75");
  marker.setAttribute("orient", "auto");

  // Create the arrowhead path
  const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  arrowPath.setAttribute("d", "M 0 0 L 5 1.75 L 0 3.5 Z");
  arrowPath.setAttribute("fill", "white");

  // Append the arrowhead path to the marker
  marker.appendChild(arrowPath);

  // Append the marker to the SVG
  svg.appendChild(marker);

  // Set the marker-end attribute on the path
  path.setAttribute("marker-end", "url(#arrowhead)");
  // Append the path to the SVG and the SVG to the document body
  svg.appendChild(path);
  document.body.appendChild(svg);
}

// Call the function with the selected element
drawLoopingLine(document.getElementById("mid"));

function drawArrowBetweenElements(startElement, endElement) {
  let startX, startY, endX, endY, controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y;
  let startRect = startElement.getBoundingClientRect();
  let endRect = endElement.getBoundingClientRect();
  if (startRect.top < endRect.top) {

    startX = startRect.right;
    startY = startRect.bottom;

    endX = endRect.right;
    endY = endRect.top;

    controlPoint1X = startX + 30;
    controlPoint1Y = startY + 10;
    controlPoint2X = endX + 30;
    controlPoint2Y = endY - 10;
  } else {

    startX = startRect.right;
    startY = startRect.top;

    endX = endRect.right;
    endY = endRect.bottom;

    controlPoint1X = startX + 30;
    controlPoint1Y = startY - 10;
    controlPoint2X = endX + 30;
    controlPoint2Y = endY + 10;
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", window.innerWidth);
  svg.setAttribute("height", window.innerHeight);
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.pointerEvents = "none";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const pathData = `
      M ${startX} ${startY}
      C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}
  `;
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "white");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-dasharray", "5, 5");

  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "5");
  marker.setAttribute("markerHeight", "3.5");
  marker.setAttribute("refX", "0");
  marker.setAttribute("refY", "1.75");
  marker.setAttribute("orient", "auto");

  const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  arrowPath.setAttribute("d", "M 0 0 L 5 1.75 L 0 3.5 Z");
  arrowPath.setAttribute("fill", "white");

  marker.appendChild(arrowPath);
  svg.appendChild(marker);
  path.setAttribute("marker-end", "url(#arrowhead)");
  // Create a text element for the label
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("fill", "white");
  text.textContent = "Branch Join";
  text.setAttribute("x", (startX + endX) / 2 + 30);
  text.setAttribute("y", (startY + endY) / 2);

  // Append the text to the SVG
  svg.appendChild(text);
  svg.appendChild(path);
  document.body.appendChild(svg);
}

// Example usage:
drawArrowBetweenElements(document.getElementById('start'), document.getElementById('mid'));
drawArrowBetweenElements(document.getElementById('end'), document.getElementById('mid'));