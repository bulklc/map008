function pop_main_data(feature, layer) {
  layer.on({
    mouseout: function (e) {
      for (var i in e.target._eventParents) {
        if (typeof e.target._eventParents[i].resetStyle === "function") {
          e.target._eventParents[i].resetStyle(e.target);
        }
      }
    },
    mouseover: highlightFeature,
  });

  var popup_content = "<table>";

  var popup_body = "";

  level_array.forEach(function (level) {
    if (feature.properties[level] !== null) {
      popup_body =
        "<tr><td style='font-size: 18px'>" +
        feature.properties[level].replace(/'/g, "'") +
        "</td></tr>";
    }
  });

  if (feature.properties.location !== null) {
    popup_body +=
      "<tr><td>&nbsp;</td></tr><tr><td><b>Location:</b></td></tr>" +
      "<tr><td>" +
      feature.properties.location.replace(/'/g, "'") +
      "</td></tr>";
  }

  if (feature.properties.date !== null) {
    popup_body +=
      "<tr><td>&nbsp;</td></tr><tr><td><b>Date:</b></td></tr>" +
      "<tr><td>" +
      feature.properties.date.replace(/'/g, "'") +
      "</td></tr>";
  }

  if (feature.properties.details !== null) {
    popup_body +=
      "<tr><td>&nbsp;</td></tr><tr><td><b>Details:</b></td></tr>" +
      "<tr><td>" +
      feature.properties.details.replace(/'/g, "'") +
      "</td></tr>";
  }

  popup_content += popup_body + "</table>";

  layer.on("popupopen", function (e) {
    addClassToPopupIfMedia(popup_content, e.popup);
  });
  layer.bindPopup(popup_content, { maxHeight: 400 });
}
