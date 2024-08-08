// moving eyes

// var balls = document.getElementsByClassName("ball");
//   document.onmousemove = function(){
//     var x = event.clientX * 100 / window.innerWidth + "%";
//     var y = event.clientY * 100 / window.innerHeight + "%";

//     for(var i=0;i<2;i++){
//       balls[i].style.left = x;
//       balls[i].style.top = y;
//       balls[i].style.transform = "translate(-"+x+",-"+y+")";
//     }
//   }

gsap.set(".load_grid", {
  display: "flex",
  // visibility: 'none'
});
gsap.to(".load_grid-item", {
  opacity: 0,
  duration: 0.01,
  stagger: { amount: 0.5, from: "random" },
  onComplete: () => {
    gsap.set(".load_grid", {
      display: "none",
      // visibility: 'hidden'
    });
  },
});

$(document).ready(function () {
  $(".a").on("click", function (e) {
    e.preventDefault();

    let destination = $(this).attr("href");
    gsap.set(".load_grid", {
      display: "flex",
    });
    gsap.fromTo(
      ".load_grid-item",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.05,
        stagger: { amount: 0.5, from: "random" },
        onComplete: () => {
          window.location = destination;
        },
      }
    );
  });
});

gsap.set(".load_grid", { display: "flex" });
gsap.to(".load_grid-item", {
  opacity: 0,
  duration: 0.001,
  stagger: { amount: 0.5, from: "random" },
  onComplete: () => {
    gsap.set(".load_grid", { display: "none" });
  },
});

const contactSection = document.querySelector("#contact");
const contactLink = document.querySelector(".c");
const backButton = document.querySelector(".back");
const miniContactLink = document.querySelector("a[href*='contact.html']");

contactLink.addEventListener("click", (e) => {
  e.preventDefault();

  gsap.to(contactSection, {
    duration: 0.7,
    ease: "power3.inOut",
    transform: "translateY(0)",
  });

  gsap.to(".contact-blur", {
    duration: 1,
    ease: "power3.inOut",
    transform: "translateY(0)",
  });
});

miniContactLink.addEventListener("click", (e) => {
  e.preventDefault();

  gsap.to(contactSection, {
    duration: 0.7,
    ease: "power3.inOut",
    transform: "translateY(0)",
  });

  gsap.to(".contact-blur", {
    duration: 1,
    ease: "power3.inOut",
    transform: "translateY(0)",
  });
});

backButton.addEventListener("click", (e) => {
  gsap.to(contactSection, {
    duration: 0.5,
    ease: "power3.inOut",
    transform: "translateY(100%)",
  });

  gsap.to(".contact-blur", {
    duration: 0.3,
    ease: "power3.inOut",
    transform: "translateY(100%)",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".link");
  const underline = document.querySelector(".underline");

  links.forEach((link) => {
    link.addEventListener("mouseover", function () {
      const linkRect = link.getBoundingClientRect();
      const navRect = link.parentNode.getBoundingClientRect();

      underline.style.width = linkRect.width + "px";
      underline.style.transform = `translateX(${
        linkRect.left - navRect.left
      }px)`;
    });

    link.addEventListener("mouseleave", function () {
      const linkRect = link.getBoundingClientRect();
      const navRect = link.parentNode.getBoundingClientRect();

      underline.style.transform = `translateX(${
        linkRect.left - navRect.left
      }px)`;
    });
  });
});
