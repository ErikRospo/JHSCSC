import { html as events } from "./content/events.md"
import { html as contact } from "./content/contact.md"
import { html as about } from "./content/about.md"
import { html as members } from "./content/members.md"
import { html as meetinginfo } from "./content/meetinginfo.md"

import './style.css'



let buttons: HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByClassName("buttons")
for (let index = 0; index < buttons.length; index++) {
  const button: HTMLAnchorElement = buttons[index];
  const originalText = button.textContent;
  let handler: number;
  button.addEventListener('mouseenter', () => {
    handler = setInterval(() => {
      const randomText = Array.from(originalText)
        .map(char => (char === ' ' ? ' ' : String.fromCharCode(33 + Math.random() * 94))) // Random ASCII printable characters
        .join('');
      button.textContent = randomText;

    }, 20)
  });
  button.addEventListener('mouseleave', () => {
    button.textContent = originalText;
    clearInterval(handler);
  });
}
window.addEventListener('hashchange', function () {
  const content = document.getElementById("content");
  if (content !== null) {

    switch (window.location.hash) {
      case "#events":
        content.innerHTML = events;
        break
      case "#contact":
        content.innerHTML = contact;
        break
      case "#about":
        content.innerHTML = about;
        break
      case "#members":
        content.innerHTML = members;
        break
      case "#meetinginfo":
        content.innerHTML = meetinginfo;
        break

      default:
        content.innerHTML = ""
        break;
    }
  }
});

const canvas: HTMLCanvasElement = document.getElementById("matrixCanvas");
if (canvas !== null) {

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
  if (ctx != null) {

    // Resize canvas to fit window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 24;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to hold the position of each column of characters
    const drops = Array(columns).fill(1000);
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    ctx.fillStyle = "rgb(0,127,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    function drawMatrixRain() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF00";
      ctx.font = fontSize + "px VT323";

      // Loop over each column
      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the text at the column position
        ctx.fillText(text, x, y);

        // Randomly reset drop height to start from top again
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment the drop position for each column
        drops[i]++;
      }
    }

    setInterval(drawMatrixRain, 50);

    // Adjust canvas size when window is resized
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops.length = Math.floor(canvas.width / fontSize);
      drops.fill(1);
    });
  }
}
