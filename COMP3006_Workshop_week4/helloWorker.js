self.addEventListener("message", function (evt) {
    let name = evt.data;
    self.postMessage("Hello" + name + " from a web worker");
})
