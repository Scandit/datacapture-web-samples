<main>
  <div id="data-capture-view" />
</main>

<style>
  #data-capture-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  @supports (-webkit-touch-callout: none) {
    #data-capture-view {
      height: -webkit-fill-available;
    }
  }
</style>
