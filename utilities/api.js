import { AsyncStorage } from "react-native";
global.tokenLe = "";

var api = {
  async token() {
    try {
      const value = await AsyncStorage.getItem("@token:data");
      if (value !== null) {
        // We have data!!
        console.log(value);
        tokenLe = value;
      }
    } catch (error) {
      console.log(error);
    }
  },

  receptek() {
    console.log(this.tokenLe);
    return fetch("http://46.101.62.53/Apps/rest/content/9/list", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(receptek => receptek.json());
  },

  receptek_custom() {
    console.log(this.tokenLe);
    return fetch(
      "http://46.101.62.53/Apps/rest/content/custom/MANO_MENU_RECEPT",
      {
        headers: {
          accept: "application/json",
          AppId: "3",
          "X-SA-DEVICE-TOKEN": tokenLe
        }
      }
    ).then(receptek => receptek.json());
  },

  hirek() {
    return fetch("http://46.101.62.53/Apps/rest/content/10/list", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(hirek => hirek.json());
  },
  hirek_custom() {
    return fetch(
      "http://46.101.62.53/Apps/rest/content/custom/MANO_MENU_CIKK",
      {
        headers: {
          accept: "application/json",
          AppId: "3",
          "X-SA-DEVICE-TOKEN": tokenLe
        }
      }
    ).then(hirek => hirek.json());
  },

  getEvent() {
    console.log(tokenLe);

    return fetch("http://46.101.62.53/Apps/rest/content/11/list", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(event => event.json());
  },

  gethathonap() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=57", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(hathonap => hathonap.json());
  },
  gethetkilenchonap() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=58", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(hetkilenchonap => hetkilenchonap.json());
  },

  gettiztizenkettohonap() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=59", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(tiztizenkettohonap => tiztizenkettohonap.json());
  },

  gettizenkettohonap() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=60", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(tizenkettohonap => tizenkettohonap.json());
  },

  //receptek, etkezes szerinti

  getReggeli() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=8", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(reggeli => reggeli.json());
  },

  getTizorai() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=9", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(tizorai => tizorai.json());
  },

  getEbed() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=10", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(ebed => ebed.json());
  },

  getUzsi() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=11", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(uzsi => uzsi.json());
  },

  getVacsi() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=12", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(vacsi => vacsi.json());
  },

  getDesszert() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=13", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(desszert => desszert.json());
  },

  getItalok() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=14", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(italok => italok.json());
  },
  //etelfajtak
  getPurek() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=16", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(purek => purek.json());
  },

  getFozelek() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=17", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(fozelek => fozelek.json());
  },

  getTesztak() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=19", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(tesztak => tesztak.json());
  },

  getSalatak() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=20", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(salatak => salatak.json());
  },

  getRakottak() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=22", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(rakottak => rakottak.json());
  },

  getSzendvicsek() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=23", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(szendvicsek => szendvicsek.json());
  },

  getLevesek() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=18", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(levesek => levesek.json());
  },

  //elkeszites

  getSult() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=25", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(sult => sult.json());
  },
  getParolt() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=26", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(parolt => parolt.json());
  },
  getFott() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=27", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(fott => fott.json());
  },
  getFagyasztott() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=28", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(fagyasztott => fagyasztott.json());
  },
  getNyers() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=29", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(nyers => nyers.json());
  },
  getGrillezett() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=30", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(grillezett => grillezett.json());
  },
  //alapanyag

  getZoldseg() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=32", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(zoldseg => zoldseg.json());
  },

  getGyumolcs() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=33", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(gyumolcs => gyumolcs.json());
  },

  getTeszta() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=34", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(teszta => teszta.json());
  },

  getHus() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=35", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(hus => hus.json());
  },

  getTojas() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=36", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(tojas => tojas.json());
  },

  getHal() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=37", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(hal => hal.json());
  },

  getTejtermekek() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=38", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(tejtermekek => tejtermekek.json());
  },

  getAlacsonykaloria() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=46", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(alacsonykaloria => alacsonykaloria.json());
  },

  //special

  getGlutenmentes() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=41", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(gluten => gluten.json());
  },

  getTejmentes() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=42", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(tejmentes => tejmentes.json());
  },

  getTojasmentes() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=43", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(tojasmentes => tojasmentes.json());
  },

  getCukormentes() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=44", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(cukormentes => cukormentes.json());
  },

  getHusmentes() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=45", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(husmentes => husmentes.json());
  },
  //unnepek

  getSzulinap() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=48", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(szulinap => szulinap.json());
  },

  getFarsang() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=49", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(farsang => farsang.json());
  },

  getHusvet() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=50", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(husvet => husvet.json());
  },

  getHalloween() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=51", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(halloween => halloween.json());
  },

  getMikulas() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=52", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(mikulas => mikulas.json());
  },

  getKaracsony() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=53", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(karacsony => karacsony.json());
  },

  getSzilveszter() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=54", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(szilveszter => szilveszter.json());
  },

  getGyereknap() {
    return fetch("http://46.101.62.53/Apps/rest/content/9/list?category=55", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(gyereknap => gyereknap.json());
  },

  getMielott() {
    return fetch("http://46.101.62.53/Apps/rest/content/10/list?category=2", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(mielott => mielott.json());
  },

  getKeszenall() {
    return fetch("http://46.101.62.53/Apps/rest/content/10/list?category=3", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(keszenall => keszenall.json());
  },

  getAlapok() {
    return fetch("http://46.101.62.53/Apps/rest/content/10/list?category=4", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(alapok => alapok.json());
  },

  getSzukseg() {
    return fetch("http://46.101.62.53/Apps/rest/content/10/list?category=5", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(szukseg => szukseg.json());
  },

  getHaadolgok() {
    return fetch("http://46.101.62.53/Apps/rest/content/10/list?category=6", {
      headers: {
        accept: "application/json",
        AppId: "3",
        "X-SA-DEVICE-TOKEN": tokenLe
      }
    }).then(haadolgok => haadolgok.json());
  }
};
module.exports = api;
