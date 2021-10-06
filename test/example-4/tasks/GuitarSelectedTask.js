GuitarSelectedTask = YngwieUI.App.init()

  // Renders stored view to show selected guitar:
  .action("showGuitar", function (MODEL, resolve, reject) {
    let selected = MODEL.prop("selected");
    MODEL.state("views").guitarView
      .text(`${selected.label} ${selected.guitar}`)
      .renderAgain();
    resolve(MODEL);
  })
