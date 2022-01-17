/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TaskCollection)
/* harmony export */ });
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _icons_dots_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _icons_delete_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _completed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





//Define the parent of the tasks
const listContainer = document.querySelector('ul');

class TaskCollection {
  constructor() {
    this.list = [];
  }

  saveStorage() {
    localStorage.setItem('collection', JSON.stringify(this.list));
  }

  addTask(description, status = false) {
    const task = new _Task_js__WEBPACK_IMPORTED_MODULE_0__["default"](description, this.list.length + 1, status);
    this.list.push(task);
    this.saveStorage();
    return task;
  }

  loadStorage() {
    const collection = JSON.parse(localStorage.getItem('collection'));

    //Add each task based on the info retrieved by the localStorage  
    if (collection) {
      collection.forEach((task) => {
        this.addTask(task.description, task.completed);
      });
      return true;
    }
    return false;
  }

  removeTask(currentTask) {
    this.list.splice(currentTask.index - 1, 1);

    //Get the div inside the card linked to the task
    const element = listContainer.querySelector(`#card-${currentTask.index}`);
    listContainer.removeChild(element.parentNode); 
    let index = 1;
    this.list.forEach((task) => {

      //Updates all further indexes if necessary  
      if (task.index - index > 0) {
        const nextTask = listContainer.querySelector(`#card-${task.index}`);
        task.index -= 1;
        nextTask.setAttribute('id', `card-${task.index}`);
      }
      index += 1;
    });
    this.saveStorage();
  }

  display(task) {
    const listParent = document.createElement('li');
    listParent.classList.add('task', 'card', 'dropparent');

    const listItem = document.createElement('div');
    listItem.classList.add('task', 'dropzone');
    listItem.setAttribute('id', `card-${task.index}`);

    const listAttributes = document.createElement('div');

    const description = document.createElement('input');
    description.value = task.description;
    description.setAttribute('type', 'text');
    description.classList.add('description');
    listAttributes.appendChild(description);

    description.insertAdjacentHTML('beforebegin', `<label class="box">
      <input class="check"  type="checkbox">
      <span class="checkmark"></span>
    </label>`);

    listItem.appendChild(listAttributes);

    const dots = new Image();
    dots.src = _icons_dots_svg__WEBPACK_IMPORTED_MODULE_1__;
    dots.alt = '';

    const dragAndRemoveButton = document.createElement('button');
    dragAndRemoveButton.appendChild(dots);
    dragAndRemoveButton.setAttribute('draggable', true);
    listItem.appendChild(dragAndRemoveButton);

    const checkBox = listItem.querySelector('.check');
    checkBox.checked = task.completed;
    (0,_completed_js__WEBPACK_IMPORTED_MODULE_3__.setStatus)(task, checkBox, description);

    listParent.appendChild(listItem);
    listContainer.appendChild(listParent);

    description.addEventListener('change', (event) => {
      task.description = event.target.value;
      this.saveStorage();
    });

    description.addEventListener('click', () => {
      listItem.style.backgroundColor = '#f1f0cc';
      dots.src = _icons_delete_svg__WEBPACK_IMPORTED_MODULE_2__;
    });

    dragAndRemoveButton.addEventListener('mouseup', () => {
      this.removeTask(task);
    });

    description.addEventListener('focusout', () => {
      listItem.style.backgroundColor = 'white';
      dots.src = _icons_dots_svg__WEBPACK_IMPORTED_MODULE_1__;
    });

    checkBox.addEventListener('change', () => {
      (0,_completed_js__WEBPACK_IMPORTED_MODULE_3__.setStatus)(task, checkBox, description);
      this.saveStorage();
    });
  }
}

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  constructor(description, index, status) {
    this.description = description;
    this.completed = status;
    this.index = index;
  }
}

/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f6100604bf904f44fdaa.svg";

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2f0fd617814f3dfa6aed.svg";

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setStatus": () => (/* binding */ setStatus),
/* harmony export */   "clearCompleted": () => (/* binding */ clearCompleted)
/* harmony export */ });
function setStatus(item, element, input) {
  item.completed = element.checked;
  if (item.completed) {
    input.style.textDecoration = 'line-through';
  } else {
    input.style.textDecoration = 'none';
  }
}

function clearCompleted(collection) {
  const newCollection = collection.filter((item) => item.completed);
  return newCollection;
}



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dragAndDrop": () => (/* binding */ dragAndDrop)
/* harmony export */ });
const listContainer = document.querySelector('ul');
let dragged;
let currentListItem;

const dragAndDrop = (tasks) => {

  listContainer.addEventListener(
    'dragstart',
    (event) => {
      dragged = event.target.parentNode.parentNode; // Selects the task card
      currentListItem = dragged;

      event.target.parentNode.parentNode.style.opacity = 0;
    },
    false,
  );

  listContainer.addEventListener('dragend', (event) => {
    event.target.parentNode.parentNode.style.opacity = 1;
  });

  listContainer.addEventListener(
    'dragover',
    (event) => {
      // prevent default to allow drop
      event.preventDefault();
    },
    false,
  );

  listContainer.addEventListener(
    'dragenter',
    (event) => {
      if (event.target.className === 'task dropzone') {
        currentListItem = event.target;

        const temp = currentListItem.parentNode;
        dragged.parentNode.appendChild(currentListItem);
        dragged.parentNode.removeChild(dragged);
        temp.appendChild(dragged);
      }
    },
    false,
  );

  listContainer.addEventListener(
    'drop',
    (event) => {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      event.target.parentNode.parentNode.style.opacity = 1;
      const listParents = listContainer.querySelectorAll('li');
      let index = 1;
      const checked = [];

      listParents.forEach((listParent) => {
        const listItem = listParent.firstChild;
        listItem.setAttribute('id', `card-${index}`);
        index += 1;
        const description = listItem.querySelector('.description');
        for (let i = 0; i < tasks.list.length; i += 1) {
          const task = tasks.list[i];
          if (task.description === description.value) {
            task.index = +listItem.id.substr(listItem.id.length - 1);
            checked.push(tasks.list.splice(i, 1)[0]);
            break;
          }
        }
      });
      tasks.list = [...checked];
      tasks.list = tasks.list.sort((a, b) => a.index - b.index);
      tasks.saveStorage();
    },
    false,
  );
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _TaskCollection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _completed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _dragAndDrop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);





const tasks = new _TaskCollection_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

const addTaskForm = document.querySelector('#addForm');
const clearButton = document.querySelector('#clear');


//Creates HTML for each task saved in the array
const render = () => {
  tasks.list = tasks.list.sort((a, b) => a.index - b.index);
  tasks.list.forEach((task) => {
    tasks.display(task);
  });
};

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = addTaskForm.querySelector('input');

  //If the form is not empty, add a Task
  if (input.value) {
    const task = tasks.addTask(input.value);
    tasks.display(task);
    input.value = '';
  }
});

//Action on window load. Renders the localStoraged array.
window.onload = () => {
  if (tasks.loadStorage()) {
    render();
  }
};

//Removes all completed tasks
clearButton.addEventListener('click', () => {
  const completedList = (0,_completed_js__WEBPACK_IMPORTED_MODULE_2__.clearCompleted)(tasks.list);
  completedList.forEach((task) => {
    tasks.removeTask(task);
  });
});

// Define Drag And Drop Event listeners

(0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_3__.dragAndDrop)(tasks);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3Qiw2REFBYztBQUN0QztBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7O0FBRUEseURBQVcsUSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL3N0eWxlcy9tYWluLnNjc3M/NGM1NSIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9UYXNrQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9UYXNrLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL2NvbXBsZXRlZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9kcmFnQW5kRHJvcC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrLmpzJztcbmltcG9ydCBEb3RzIGZyb20gJy4vaWNvbnMvZG90cy5zdmcnO1xuaW1wb3J0IERlbGV0ZUltZyBmcm9tICcuL2ljb25zL2RlbGV0ZS5zdmcnO1xuaW1wb3J0IHsgc2V0U3RhdHVzIH0gZnJvbSAnLi9jb21wbGV0ZWQuanMnO1xuXG4vL0RlZmluZSB0aGUgcGFyZW50IG9mIHRoZSB0YXNrc1xuY29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5saXN0ID0gW107XG4gIH1cblxuICBzYXZlU3RvcmFnZSgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29sbGVjdGlvbicsIEpTT04uc3RyaW5naWZ5KHRoaXMubGlzdCkpO1xuICB9XG5cbiAgYWRkVGFzayhkZXNjcmlwdGlvbiwgc3RhdHVzID0gZmFsc2UpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2soZGVzY3JpcHRpb24sIHRoaXMubGlzdC5sZW5ndGggKyAxLCBzdGF0dXMpO1xuICAgIHRoaXMubGlzdC5wdXNoKHRhc2spO1xuICAgIHRoaXMuc2F2ZVN0b3JhZ2UoKTtcbiAgICByZXR1cm4gdGFzaztcbiAgfVxuXG4gIGxvYWRTdG9yYWdlKCkge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb2xsZWN0aW9uJykpO1xuXG4gICAgLy9BZGQgZWFjaCB0YXNrIGJhc2VkIG9uIHRoZSBpbmZvIHJldHJpZXZlZCBieSB0aGUgbG9jYWxTdG9yYWdlICBcbiAgICBpZiAoY29sbGVjdGlvbikge1xuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkVGFzayh0YXNrLmRlc2NyaXB0aW9uLCB0YXNrLmNvbXBsZXRlZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZW1vdmVUYXNrKGN1cnJlbnRUYXNrKSB7XG4gICAgdGhpcy5saXN0LnNwbGljZShjdXJyZW50VGFzay5pbmRleCAtIDEsIDEpO1xuXG4gICAgLy9HZXQgdGhlIGRpdiBpbnNpZGUgdGhlIGNhcmQgbGlua2VkIHRvIHRoZSB0YXNrXG4gICAgY29uc3QgZWxlbWVudCA9IGxpc3RDb250YWluZXIucXVlcnlTZWxlY3RvcihgI2NhcmQtJHtjdXJyZW50VGFzay5pbmRleH1gKTtcbiAgICBsaXN0Q29udGFpbmVyLnJlbW92ZUNoaWxkKGVsZW1lbnQucGFyZW50Tm9kZSk7IFxuICAgIGxldCBpbmRleCA9IDE7XG4gICAgdGhpcy5saXN0LmZvckVhY2goKHRhc2spID0+IHtcblxuICAgICAgLy9VcGRhdGVzIGFsbCBmdXJ0aGVyIGluZGV4ZXMgaWYgbmVjZXNzYXJ5ICBcbiAgICAgIGlmICh0YXNrLmluZGV4IC0gaW5kZXggPiAwKSB7XG4gICAgICAgIGNvbnN0IG5leHRUYXNrID0gbGlzdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAjY2FyZC0ke3Rhc2suaW5kZXh9YCk7XG4gICAgICAgIHRhc2suaW5kZXggLT0gMTtcbiAgICAgICAgbmV4dFRhc2suc2V0QXR0cmlidXRlKCdpZCcsIGBjYXJkLSR7dGFzay5pbmRleH1gKTtcbiAgICAgIH1cbiAgICAgIGluZGV4ICs9IDE7XG4gICAgfSk7XG4gICAgdGhpcy5zYXZlU3RvcmFnZSgpO1xuICB9XG5cbiAgZGlzcGxheSh0YXNrKSB7XG4gICAgY29uc3QgbGlzdFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGlzdFBhcmVudC5jbGFzc0xpc3QuYWRkKCd0YXNrJywgJ2NhcmQnLCAnZHJvcHBhcmVudCcpO1xuXG4gICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrJywgJ2Ryb3B6b25lJyk7XG4gICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIGBjYXJkLSR7dGFzay5pbmRleH1gKTtcblxuICAgIGNvbnN0IGxpc3RBdHRyaWJ1dGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nKTtcbiAgICBsaXN0QXR0cmlidXRlcy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICBkZXNjcmlwdGlvbi5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgYDxsYWJlbCBjbGFzcz1cImJveFwiPlxuICAgICAgPGlucHV0IGNsYXNzPVwiY2hlY2tcIiAgdHlwZT1cImNoZWNrYm94XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImNoZWNrbWFya1wiPjwvc3Bhbj5cbiAgICA8L2xhYmVsPmApO1xuXG4gICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQobGlzdEF0dHJpYnV0ZXMpO1xuXG4gICAgY29uc3QgZG90cyA9IG5ldyBJbWFnZSgpO1xuICAgIGRvdHMuc3JjID0gRG90cztcbiAgICBkb3RzLmFsdCA9ICcnO1xuXG4gICAgY29uc3QgZHJhZ0FuZFJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRyYWdBbmRSZW1vdmVCdXR0b24uYXBwZW5kQ2hpbGQoZG90cyk7XG4gICAgZHJhZ0FuZFJlbW92ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsIHRydWUpO1xuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGRyYWdBbmRSZW1vdmVCdXR0b24pO1xuXG4gICAgY29uc3QgY2hlY2tCb3ggPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcuY2hlY2snKTtcbiAgICBjaGVja0JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZWQ7XG4gICAgc2V0U3RhdHVzKHRhc2ssIGNoZWNrQm94LCBkZXNjcmlwdGlvbik7XG5cbiAgICBsaXN0UGFyZW50LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICBsaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RQYXJlbnQpO1xuXG4gICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICB0YXNrLmRlc2NyaXB0aW9uID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgdGhpcy5zYXZlU3RvcmFnZSgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsaXN0SXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2YxZjBjYyc7XG4gICAgICBkb3RzLnNyYyA9IERlbGV0ZUltZztcbiAgICB9KTtcblxuICAgIGRyYWdBbmRSZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlVGFzayh0YXNrKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKCkgPT4ge1xuICAgICAgbGlzdEl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgIGRvdHMuc3JjID0gRG90cztcbiAgICB9KTtcblxuICAgIGNoZWNrQm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHNldFN0YXR1cyh0YXNrLCBjaGVja0JveCwgZGVzY3JpcHRpb24pO1xuICAgICAgdGhpcy5zYXZlU3RvcmFnZSgpO1xuICAgIH0pO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uLCBpbmRleCwgc3RhdHVzKSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY29tcGxldGVkID0gc3RhdHVzO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxufSIsImZ1bmN0aW9uIHNldFN0YXR1cyhpdGVtLCBlbGVtZW50LCBpbnB1dCkge1xuICBpdGVtLmNvbXBsZXRlZCA9IGVsZW1lbnQuY2hlY2tlZDtcbiAgaWYgKGl0ZW0uY29tcGxldGVkKSB7XG4gICAgaW5wdXQuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbGluZS10aHJvdWdoJztcbiAgfSBlbHNlIHtcbiAgICBpbnB1dC5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdub25lJztcbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhckNvbXBsZXRlZChjb2xsZWN0aW9uKSB7XG4gIGNvbnN0IG5ld0NvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb21wbGV0ZWQpO1xuICByZXR1cm4gbmV3Q29sbGVjdGlvbjtcbn1cblxuZXhwb3J0IHsgc2V0U3RhdHVzLCBjbGVhckNvbXBsZXRlZCB9OyIsImNvbnN0IGxpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xubGV0IGRyYWdnZWQ7XG5sZXQgY3VycmVudExpc3RJdGVtO1xuXG5leHBvcnQgY29uc3QgZHJhZ0FuZERyb3AgPSAodGFza3MpID0+IHtcblxuICBsaXN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgJ2RyYWdzdGFydCcsXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICBkcmFnZ2VkID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTsgLy8gU2VsZWN0cyB0aGUgdGFzayBjYXJkXG4gICAgICBjdXJyZW50TGlzdEl0ZW0gPSBkcmFnZ2VkO1xuXG4gICAgICBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIH0sXG4gICAgZmFsc2UsXG4gICk7XG5cbiAgbGlzdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgfSk7XG5cbiAgbGlzdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICdkcmFnb3ZlcicsXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICAvLyBwcmV2ZW50IGRlZmF1bHQgdG8gYWxsb3cgZHJvcFxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIGZhbHNlLFxuICApO1xuXG4gIGxpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnZHJhZ2VudGVyJyxcbiAgICAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAndGFzayBkcm9wem9uZScpIHtcbiAgICAgICAgY3VycmVudExpc3RJdGVtID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIGNvbnN0IHRlbXAgPSBjdXJyZW50TGlzdEl0ZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgZHJhZ2dlZC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGN1cnJlbnRMaXN0SXRlbSk7XG4gICAgICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAgICAgdGVtcC5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGZhbHNlLFxuICApO1xuXG4gIGxpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnZHJvcCcsXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICAvLyBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uIChvcGVuIGFzIGxpbmsgZm9yIHNvbWUgZWxlbWVudHMpXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIGNvbnN0IGxpc3RQYXJlbnRzID0gbGlzdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuICAgICAgbGV0IGluZGV4ID0gMTtcbiAgICAgIGNvbnN0IGNoZWNrZWQgPSBbXTtcblxuICAgICAgbGlzdFBhcmVudHMuZm9yRWFjaCgobGlzdFBhcmVudCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGxpc3RQYXJlbnQuZmlyc3RDaGlsZDtcbiAgICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIGBjYXJkLSR7aW5kZXh9YCk7XG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MubGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IHRhc2sgPSB0YXNrcy5saXN0W2ldO1xuICAgICAgICAgIGlmICh0YXNrLmRlc2NyaXB0aW9uID09PSBkZXNjcmlwdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgdGFzay5pbmRleCA9ICtsaXN0SXRlbS5pZC5zdWJzdHIobGlzdEl0ZW0uaWQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBjaGVja2VkLnB1c2godGFza3MubGlzdC5zcGxpY2UoaSwgMSlbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRhc2tzLmxpc3QgPSBbLi4uY2hlY2tlZF07XG4gICAgICB0YXNrcy5saXN0ID0gdGFza3MubGlzdC5zb3J0KChhLCBiKSA9PiBhLmluZGV4IC0gYi5pbmRleCk7XG4gICAgICB0YXNrcy5zYXZlU3RvcmFnZSgpO1xuICAgIH0sXG4gICAgZmFsc2UsXG4gICk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL3N0eWxlcy9tYWluLnNjc3MnO1xuaW1wb3J0IFRhc2tDb2xsZWN0aW9uIGZyb20gJy4vVGFza0NvbGxlY3Rpb24uanMnO1xuaW1wb3J0IHsgY2xlYXJDb21wbGV0ZWQgfSBmcm9tICcuL2NvbXBsZXRlZC5qcyc7XG5pbXBvcnQgeyBkcmFnQW5kRHJvcCB9IGZyb20gJy4vZHJhZ0FuZERyb3AnO1xuXG5jb25zdCB0YXNrcyA9IG5ldyBUYXNrQ29sbGVjdGlvbigpO1xuXG5jb25zdCBhZGRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRGb3JtJyk7XG5jb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbGVhcicpO1xuXG5cbi8vQ3JlYXRlcyBIVE1MIGZvciBlYWNoIHRhc2sgc2F2ZWQgaW4gdGhlIGFycmF5XG5jb25zdCByZW5kZXIgPSAoKSA9PiB7XG4gIHRhc2tzLmxpc3QgPSB0YXNrcy5saXN0LnNvcnQoKGEsIGIpID0+IGEuaW5kZXggLSBiLmluZGV4KTtcbiAgdGFza3MubGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgdGFza3MuZGlzcGxheSh0YXNrKTtcbiAgfSk7XG59O1xuXG5hZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgaW5wdXQgPSBhZGRUYXNrRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXG4gIC8vSWYgdGhlIGZvcm0gaXMgbm90IGVtcHR5LCBhZGQgYSBUYXNrXG4gIGlmIChpbnB1dC52YWx1ZSkge1xuICAgIGNvbnN0IHRhc2sgPSB0YXNrcy5hZGRUYXNrKGlucHV0LnZhbHVlKTtcbiAgICB0YXNrcy5kaXNwbGF5KHRhc2spO1xuICAgIGlucHV0LnZhbHVlID0gJyc7XG4gIH1cbn0pO1xuXG4vL0FjdGlvbiBvbiB3aW5kb3cgbG9hZC4gUmVuZGVycyB0aGUgbG9jYWxTdG9yYWdlZCBhcnJheS5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGlmICh0YXNrcy5sb2FkU3RvcmFnZSgpKSB7XG4gICAgcmVuZGVyKCk7XG4gIH1cbn07XG5cbi8vUmVtb3ZlcyBhbGwgY29tcGxldGVkIHRhc2tzXG5jbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgY29tcGxldGVkTGlzdCA9IGNsZWFyQ29tcGxldGVkKHRhc2tzLmxpc3QpO1xuICBjb21wbGV0ZWRMaXN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICB0YXNrcy5yZW1vdmVUYXNrKHRhc2spO1xuICB9KTtcbn0pO1xuXG4vLyBEZWZpbmUgRHJhZyBBbmQgRHJvcCBFdmVudCBsaXN0ZW5lcnNcblxuZHJhZ0FuZERyb3AodGFza3MpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==