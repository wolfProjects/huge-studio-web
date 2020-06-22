import "./index.less";
import $ from "jquery";

//  App
const App = {
  openModal(jobId) {
    let jobInfo = $(`.${jobId}`);

    //  clean the modal
    $(".job .job-title span").empty();
    $(".job .job-title small").empty();
    $(".job dd").remove();

    $(".job .job-title span").text(jobInfo.find(".title").text());
    $(".job .job-title small").text(
      `（工资：${jobInfo.find(".salary").text()}）`
    );
    $(".job .duety").append(jobInfo.find(".duety").clone());
    $(".job .request").append(jobInfo.find(".request").clone());
    $(".job .hr").append(jobInfo.find(".hr").clone());
    $(".modal").show();
  },
  closeModal() {
    $(".modal").hide();
  },
  initModal() {
    let that = this;

    //  add modal open event for each job title
    $(".stations").on("click", ".jobs-item", function () {
      //  request Job description, then open the modal
      let jobId = $(this).attr("data-job-id");
      that.openModal(jobId);
    });

    $(".modal-close").on("click", () => {
      this.closeModal();
    });
  },

  init() {
    console.log("init app....");
    this.initModal();
  },
};

//  init
App.init();
