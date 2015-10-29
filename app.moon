Lapis           = require "lapis"
HTMLLuonti      = require "lapis.html"
Kappaleet       = require "kappaleet"

TehtavaLista = (VaikeusAste, TehtavaLista) ->
    HTMLLuonti.render_html ->
        for Tehtava in *TehtavaLista do
            div class: "tehtava " .. VaikeusAste, Tehtava

class extends Lapis.Application
    "/": =>
        "Welcome to Lapis #{require "lapis.version"}!"
    "/kappale/:numero/:nimi": =>
        KappaleData = Kappaleet[@params.nimi]
        @html ->
            meta charset: "utf-8"
            link rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto"
            link rel: "stylesheet", href: "/static/kappale.css"
            link href: "https://fonts.googleapis.com/icon?family=Material+Icons", rel: "stylesheet" -- Material Design -ikonit
            script src: "/static/piilo-div.js"
            h1 class: "kappale-nimi", KappaleData.nimi
            div class: "material-osio sisennys", ->
                a class: "avain", href: "#", ["data-piilo-div"]: "video", ->
                    h2 class: "video-nimi", ->
                        text "Opetusvideo"
                        i class: "material-icons md-24", "expand_more"
                if KappaleData.video then
                    div class: "video piilotettu", id: "video", ->
                        a href: "http://youtu.be/" .. KappaleData.video, id: "video-youtubessa", class: "video-linkki", "Katso YouTubessa"
                        iframe id: "ytplayer", type: "text/html", width: 640, height: 390, src: "http://www.youtube.com/embed/" .. KappaleData.video
            div class: "sisennys", ->
                h2 class: "tehtavat-nimi", "Tehtävät"
                div class: "tehtavat", ->
                    with KappaleData.tehtavat
                        raw TehtavaLista "helpot", .helpot
                        raw TehtavaLista "keskivaikeat", .keskivaikeat
                        raw TehtavaLista "vaikeat", .vaikeat
                        raw TehtavaLista "laksyt", .laksyt
