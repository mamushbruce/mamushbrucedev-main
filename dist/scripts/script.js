class Item {
  constructor(icon, backgroundColor, href) {
    this.$element = $(document.createElement(href === "#" ? "div" : "a"));
    this.icon = icon;
    this.$element.addClass("item");
    this.$element.css("background-color", backgroundColor);
    this.$element.attr("href", href);
    var i = document.createElement("i");
    $(i).addClass("fi-" + icon);
    this.$element.append(i);
    this.prev = null;
    this.next = null;
    this.isMoving = false;
    var element = this;
    // this.$element.on("mousemove", function () {
    //   clearTimeout(timeOut);
    //   timeOut = setTimeout(function () {
    //     if (element.next && element.isMoving) {
    //       element.next.moveTo(element);
    //     }
    //   }, 10);
    // });
  }

  moveTo(item) {
    anime({
      targets: this.$element[0],
      left: item.$element.css("left"),
      top: item.$element.css("top"),
      duration: 700,
      elasticity: 500,
    });
    if (this.next) {
      this.next.moveTo(item);
    }
  }

  updatePosition() {
    anime({
      targets: this.$element[0],
      left: this.prev.$element.css("left"),
      top: this.prev.$element.css("top"),
      duration: 80,
    });

    if (this.next) {
      this.next.updatePosition();
    }
  }
}

class Menu {
  constructor(menu) {
    this.$element = $(menu);
    this.size = 0;
    this.first = null;
    this.last = null;
    this.timeOut = null;
    this.hasMoved = false;
    this.status = "closed";
  }

  add(item) {
    var menu = this;
    if (this.first == null) {
      this.first = item;
      this.last = item;
      this.first.$element.on("mouseup", function () {
        if (menu.first.isMoving) {
          menu.first.isMoving = false;
        } else {
          menu.click();
        }
      });
      item.$element.draggable(
        {
          start: function () {
            menu.close();
            item.isMoving = true;
          },
        },
        {
          drag: function () {
            if (item.next) {
              item.next.updatePosition();
            }
          },
        },
        {
          stop: function () {
            item.isMoving = false;
            item.next.moveTo(item);
          },
        }
      );
    } else {
      this.last.next = item;
      item.prev = this.last;
      this.last = item;
    }
    this.$element.after(item.$element);
  }

  open() {
    this.status = "open";
    var current = this.first.next;
    var iterator = 1;
    var head = this.first;
    var sens = head.$element.css("left") < head.$element.css("right") ? 1 : -1;
    while (current != null) {
      anime({
        targets: current.$element[0],
        left: parseInt(head.$element.css("left"), 5) + sens * (iterator * 70),
        top: head.$element.css("top"),
        duration: 500,
      });
      iterator++;
      current = current.next;
    }
  }

  close() {
    this.status = "closed";
    var current = this.first.next;
    var head = this.first;
    var iterator = 1;
    while (current != null) {
      anime({
        targets: current.$element[0],
        left: head.$element.css("left"),
        top: head.$element.css("top"),
        duration: 500,
      });
      iterator++;
      current = current.next;
    }
  }

  click() {
    if (this.status == "closed") {
      this.open();
    } else {
      this.close();
    }

    var href = this.first.$element.attr("data-href");
    if (href) {
      window.location.href = href; // Redirect to the specified URL
    }
  }
}

var menu = new Menu("#myMenu");

var item1 = new Item("list", "#cccccc", "#");
var item2 = new Item("torso", "#5CD1FF", "index.html");
var item3 = new Item("list", "#FFF15C", "about.html");
var item4 = new Item("torso", "#FF5C5C", "project.html");
var item5 = new Item("list", "#64F592", "contact.html");

menu.add(item1);
menu.add(item2);
menu.add(item3);
menu.add(item4);
menu.add(item5);
$(document)
  .delay(50)
  .queue(function (next) {
    menu.open();
    next();
    $(document)
      .delay(1000)
      .queue(function (next) {
        menu.close();
        next();
      });
  });

// class Item {
//   constructor(icon, backgroundColor = "#FFFFFF", href = "#") {
//     this.element = document.createElement(href === "#" ? "div" : "a");
//     this.element.className = "item";
//     this.element.style.backgroundColor = backgroundColor;
//     if (href !== "#") this.element.href = href;

//     const iconElement = document.createElement("i");
//     iconElement.className = "fi-" + icon;
//     this.element.appendChild(iconElement);

//     this.prev = null;
//     this.next = null;
//     this.isMoving = false;
//     this.initMouseEvents();
//   }

//   initMouseEvents() {
//     this.element.addEventListener("mousemove", () => {
//       clearTimeout(timeOut);
//       timeOut = setTimeout(() => {
//         if (this.next && this.isMoving) {
//           this.next.moveTo(this);
//         }
//       }, 10);
//     });
//   }

//   moveTo(item) {
//     anime({
//       targets: this.element,
//       left: item.element.style.left,
//       top: item.element.style.top,
//       duration: 700,
//       elasticity: 500,
//     });
//     if (this.next) {
//       this.next.moveTo(item);
//     }
//   }

//   updatePosition() {
//     anime({
//       targets: this.element,
//       left: this.prev.element.style.left,
//       top: this.prev.element.style.top,
//       duration: 80,
//     });

//     if (this.next) {
//       this.next.updatePosition();
//     }
//   }
// }

// class Menu {
//   constructor(selector) {
//     this.element = document.querySelector(selector);
//     this.first = null;
//     this.last = null;
//     this.status = "closed";
//   }

//   add(item) {
//     if (!this.first) {
//       this.initFirstItem(item);
//     } else {
//       this.appendItem(item);
//     }
//     this.element.after(item.element);
//   }

//   initFirstItem(item) {
//     this.first = this.last = item;
//     item.element.addEventListener("mouseup", () =>
//       this.first.isMoving ? (this.first.isMoving = false) : this.toggle()
//     );
//     item.element.draggable = true;

//     item.element.addEventListener("dragstart", () => {
//       this.close();
//       item.isMoving = true;
//     });

//     item.element.addEventListener("drag", () => {
//       if (item.next) {
//         item.next.updatePosition();
//       }
//     });

//     item.element.addEventListener("dragend", () => {
//       item.isMoving = false;
//       if (item.next) {
//         item.next.moveTo(item);
//       }
//     });
//   }

//   appendItem(item) {
//     this.last.next = item;
//     item.prev = this.last;
//     this.last = item;
//   }

//   open() {
//     this.status = "open";
//     let current = this.first.next;
//     var iterator = 1;
//     while (current) {
//       anime({
//         targets: current.element,
//         left: `${
//           parseInt(this.first.element.style.left || 0) + iterator * 150
//         }px`,
//         top: this.first.element.style.top,
//         duration: 500,
//       });
//       current = current.next;
//       iterator++;
//     }
//   }

//   close() {
//     this.status = "closed";
//     let current = this.first.next;
//     var iterator = 1;
//     while (current) {
//       anime({
//         targets: current.element,
//         left: this.first.element.style.left,
//         top: this.first.element.style.top,
//         duration: 500,
//       });
//       iterator++;
//       current = current.next;
//     }
//   }

//   toggle() {
//     this.status === "closed" ? this.open() : this.close();
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const menu = new Menu("#myMenu");
//   menu.add(new Item("list"));
//   menu.add(new Item("home", "#FF5C5C", "/home"));
//   menu.add(new Item("info", "#5CD1FF", "/about"));
//   menu.add(new Item("book", "#FFF15C", "/projects"));
//   menu.add(new Item("mail", "#64F592", "/contact"));

//   setTimeout(() => {
//     menu.open();
//     setTimeout(() => {
//       menu.close();
//     }, 1000);
//   }, 50);
// });
