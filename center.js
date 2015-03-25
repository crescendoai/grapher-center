;(function (g) {

/**
  * grapher.center
  * ------------------
  * 
  * Center the network in the view.
  */
  g.prototype.center = function () {
    var x = 0,
        y = 0,
        scale = 1,
        nodes = this.data() ? this.data().nodes : null,
        numNodes = nodes ? nodes.length : 0;

    if (numNodes) { // get initial transform
      var minX = Infinity, maxX = -Infinity,
          minY = Infinity, maxY = -Infinity,
          width = this.canvas.width / this.props.resolution,
          height = this.canvas.height / this.props.resolution,
          pad = 1.1,
          i;

      for (i = 0; i < numNodes; i++) {
        if (nodes[i].x < minX) minX = nodes[i].x;
        if (nodes[i].x > maxX) maxX = nodes[i].x;
        if (nodes[i].y < minY) minY = nodes[i].y;
        if (nodes[i].y > maxY) maxY = nodes[i].y;
      }
      
      var dX = maxX - minX,
          dY = maxY - minY;

      scale = Math.min(width / dX, height / dY, 2) / pad;
      x = (width - dX * scale) / 2 - minX * scale;
      y = (height - dY * scale) / 2 - minY * scale;
    }

    return this.scale(scale).translate([x, y]);
  };

/**
  * Extend data to call this.center,
  * scale and translate to track when the user modifies the transform.
  */
  var data = g.prototype.data,
      scale = g.prototype.scale,
      translate = g.prototype.translate;

  g.prototype._hasModifiedTransform = false;
  g.prototype.data = function () {
    var res = data.apply(this, arguments);
    if (res === this && !this._hasModifiedTransform) this.center();
    return res;
  };
  g.prototype.scale = function () {
    var res = scale.apply(this, arguments);
    if (res === this) this._hasModifiedTransform = true;
    return res;
  };
  g.prototype.translate = function () {
    var res = translate.apply(this, arguments);
    if (res === this) this._hasModifiedTransform = true;
    return res;
  };

})(Grapher);
