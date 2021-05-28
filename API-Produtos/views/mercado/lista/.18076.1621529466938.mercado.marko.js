// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/api-produtos$1.0.0/views/mercado/lista/mercado.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Mercado virtual</title><style>\r\n    body {\r\n      font-family: 'Courier New', Courier, monospace;\r\n    }\r\n\r\n    .container {\r\n      display: flex;\r\n      flex-wrap: wrap;\r\n      justify-content: space-between;\r\n    }\r\n\r\n    .container iframe {\r\n      margin: 4em;\r\n      border: none;\r\n    }\r\n\r\n    .product {\r\n      border: 1px solid;\r\n      border-radius: 25px;\r\n      max-width: 280px;\r\n    }\r\n\r\n    .product p {\r\n      /* padding: 0px; */\r\n      /* margin: 0px; */\r\n      margin-left: 10px;\r\n    }\r\n  </style></head><body>");

  component_globals_tag({}, out);

  out.w("<h1 style=\"text-align: center;\">Mercado virtual</h1><div class=\"container\">");

  var for__10 = 0;

  marko_forEach(data.list, function(p) {
    var keyscope__11 = "[" + ((for__10++) + "]");

    out.w("<div class=\"product\"> <iframe width=\"150\" height=\"150\" src=\"https://api.qrserver.com/v1/create-qr-code/?size=150x150&amp;data={%27name%27:%27" +
      marko_escapeXmlAttr(p.name) +
      "%27,%20%27price%27:%20" +
      marko_escapeXmlAttr(p.price) +
      "}\"></iframe><p>Nome: " +
      marko_escapeXml(p.name) +
      "</p><p>Preço: " +
      marko_escapeXml(p.price) +
      "</p></div>");
  });

  out.w("</div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "16");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/api-produtos$1.0.0/views/mercado/lista/mercado.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
