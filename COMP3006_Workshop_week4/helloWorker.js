self.addEventListener("message", function (evt) {
    console.log("this is working")
    let name = evt.data;
    self.postMessage("Hello" + name + " from a web worker");
})
