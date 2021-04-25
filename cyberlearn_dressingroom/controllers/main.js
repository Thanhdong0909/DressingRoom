$(document).ready(() => {
  let callData = new CallData();
  let listChosen = new ListChosen();

  callData.getListData()
    .done((data)=> {
      const {navPills, tabPanes} = data;
      let contentHtml = '';
      let contentTabName = '';
      navPills.forEach((item, index) => {
        const activeClass = index === 0 ? "active" : "";
        const fadeClass = index !== 0 ? "fade" : "";
        contentHtml += getElementTabName(item, activeClass);
        contentTabName += `
          <div class="tab-pane container ${fadeClass} ${activeClass}" id="${item.tabName}">
            <div class="row">
              ${renderTabpen(item.tabName, tabPanes)}
            </div>
          </div>
        `
      });
      $(".nav-pills").html(contentHtml);
      $(".tab-content").html(contentTabName);
    })
    .fail((err) => {
      console.log(err);
    });

    const getElementTabName = (item, activeClass) => {
      return `
        <li class="nav-item">
        <a
        class="nav-link btn-default ${activeClass}"
        data-toggle="pill"
        href="#${item.tabName}"
        >
        ${item.showName}
        </a>
        </li>
      `
    }

    const getListtabPanesByType = (type, tabPanes) => {
      let result = [];
      tabPanes.forEach((item)=>{
        if(type === item.type) {
          result.push(item);
        }
      })
      return result;
    }

    const getElementContentByTab = (listContent) => {
      let elementResult = '';
      listContent.forEach((item)=> {
        elementResult += `
          <div class="col-md-3">
            <div class="card text-center">
            <img src="${item.imgSrc_jpg}">
            <h4><b>${item.name}</b></h4>
            <button
              data-id="${item.id}"
              data-type="${item.type}"
              data-name="${item.name}"
              data-desc="${item.desc}"
              data-jpg="${item.imgSrc_jpg}"
              data-png="${item.imgSrc_png}"
              class="changeStyle"
            >
            Thử Đồ</button>
            </div>
          </div>
        `
      })
      return elementResult;
    }

    const renderTabpen = (tabName, tabPanes) => {
      let arrTemp = [];
      let elementResult = '';
      switch (tabName) {
        case "tabTopClothes":
          arrTemp = getListtabPanesByType("topclothes", tabPanes)
          elementResult = getElementContentByTab(arrTemp)
          break;
        case "tabBotClothes":
          arrTemp = getListtabPanesByType("botclothes", tabPanes)
          elementResult = getElementContentByTab(arrTemp)
          break;
        case "tabShoes":
          arrTemp = getListtabPanesByType("shoes", tabPanes)
          elementResult = getElementContentByTab(arrTemp)
          break;
        case "tabHandBags":
          arrTemp = getListtabPanesByType("handbags", tabPanes)
          elementResult = getElementContentByTab(arrTemp)
          break;
        case "tabNecklaces":
          arrTemp = getListtabPanesByType("necklaces", tabPanes)
          elementResult = getElementContentByTab(arrTemp)
          break;
        case "tabHairStyle":
          arrTemp = getListtabPanesByType("hairstyle", tabPanes)
          elementResult = getElementContentByTab(arrTemp)
          break;
        default:
          arrTemp = getListtabPanesByType("background", tabPanes)
          elementResult = getElementContentByTab(arrTemp)
          break;
      }
      return elementResult;
    }

     function findIndex(type) {
      if (listChosen.arr && listChosen.arr.length > 0) {
        // listChosen.arr.forEach((item, index) => {
        //   if(item.type === type) {
        //     debugger
        //     return index;
        //   }
        // })
        for(let i =0; i < listChosen.arr.length; i++){
          if(listChosen.arr[i].type === type) {
            return i;
          }
        }
      }
      return -1;
    }

    $('body').delegate(".changeStyle", "click", function(){
      let id = $(this).data("id");
      let type = $(this).data("type");
      let name = $(this).data("name");
      let desc = $(this).data("desc");
      let imgsrc_jpg = $(this).data("jpg");
      let imgsrc_png = $(this).data("png");

      let chooseItem = new ChoseItem(id, type, name, desc, imgsrc_jpg, imgsrc_png);
      // console.log("🚀 ~ file: main.js ~ line 140 ~ $ ~ chooseItem", chooseItem)

      let index = findIndex(chooseItem.type);
      if(index === -1) {
        listChosen.addAddItem(chooseItem);
      } else {
        listChosen.arr[index] = chooseItem;
      }
      renderContain(listChosen.arr);
    });

    function renderContain(chosenItems) {
      if (chosenItems && chosenItems.length > 0) {
        chosenItems.forEach(function(item) {
          if (item.type === "topclothes") {
            renderBikiniTop(item.imgsrc_png);
          }
          if (item.type === "botclothes") {
            renderBikiniBottom(item.imgsrc_png);
          }
          if (item.type === "shoes") {
            renderFeet(item.imgsrc_png);
          }
          if (item.type === "handbags") {
            renderHandbags(item.imgsrc_png);
          }
          if (item.type === "necklaces") {
            renderNecklace(item.imgsrc_png);
          }
          if (item.type === "hairstyle") {
            renderHairstyle(item.imgsrc_png);
          }
          if (item.type === "background") {
            renderBackground(item.imgsrc_png);
          }
        });
      }
    }

    function renderBikiniTop(img) {
      $(".bikinitop").css({
        width: "500px",
        height: "500px",
        background: `url(${img})`,
        position: "absolute",
        top: "-9%",
        left: "-5%",
        zIndex: "3",
        transform: "scale(0.5)"
      });
    }

    function renderBikiniBottom(img) {
      $(".bikinibottom").css({
        width: "500px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        top: "-30%",
        left: "-5%",
        zIndex: "2",
        transform: "scale(0.5)"
      });
    }

    function renderFeet(img) {
      $(".feet").css({
        width: "500px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        bottom: "-37%",
        right: "-3.5%",
        transform: "scale(0.5)",
        zIndex: "1"
      });
    }

    function renderHandbags(img) {
      $(".handbag").css({
        width: "500px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        bottom: "-40%",
        right: "-3.5%",
        transform: "scale(0.5)",
        zIndex: "4"
      });
    }

    function renderNecklace(img) {
      $(".necklace").css({
        width: "500px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        bottom: "-40%",
        right: "-3.5%",
        transform: "scale(0.5)",
        zIndex: "4"
      });
    }

    function renderHairstyle(img) {
      $(".hairstyle").css({
        width: "1000px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        top: "-75%",
        right: "-57%",
        transform: "scale(0.15)",
        zIndex: "4"
      });
    }

    function renderBackground(img) {
      $(".background").css({
        backgroundImage: `url(${img})`
      });
    }
})
