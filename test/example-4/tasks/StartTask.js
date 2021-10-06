StartTask = YngwieUI.App.init()

  // Renders SELECT for "guitars" MODEL:
  .action("initSelect", function (MODEL, resolve, reject) {

    // Get "guitars" from model:
    let guitars = Object.entries(MODEL.state("guitars"));

    // Initialize SELECT element:
    let select = guitars.reduce((elem, [key, value]) => {
      let option = YngwieUI.View.init("option", {"value":value}, key);
      return elem.append(option)
    }, YngwieUI.View.init("select"));

    // Bind listener to element to set selected "guitar" from select
    select.on("click", (evt, node) => {
      let [label, guitar] = guitars[node.selectedIndex];
      MODEL.prop("selected", {
        "label":label,
        "guitar":guitar
      });
      this.run("guitarSelected");
    }).render("main");

    // Store view in model:
    MODEL.update("views", (views) => {
      views.guitarSelect = select;
      return views;
    })

    resolve(MODEL);

  })

  // Renders view for select guitar from MODEL:
  .action("initSelectedView", function (MODEL, resolve, reject) {

    // Initialize view for showing selected guitar:
    let view = YngwieUI.View.init("div")
      .attrib("id", "guitarView")
      .text("No Guitar Selected");

    // Render view:
    view.render("main");

    // Store view in model:
    MODEL.update("views", (views) => {
      views.guitarView = view;
      return views;
    });

    resolve(MODEL);

  })

  // Renders view for reset button
  .action("initClearButton", function (MODEL, resolve, reject) {

    // Initialize and render view:
    YngwieUI.View.init("input", {"type":"button", "value":"Reset"}).on("click", (evt) => {
      let confirmReset = confirm("Are you sure you want to reset everything?");
      if (confirmReset) {
        this.send("clearView", ["main", MODEL.prop("selected")]);
        MODEL.prop("selected", "undefined");
      }
    }).render("main");

    resolve(MODEL);

  })
