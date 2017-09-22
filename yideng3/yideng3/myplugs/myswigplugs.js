/**
 * Created by he.mingze on 2017/9/21.
 */
function MyPlugin(options) {
    // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            function injectFile(arr,type){
                var all='',
                    tagHead='',tagBottom='';
                if(type=='js'){
                    tagHead='<script type="text/javascript" src="';
                    tagBottom='"></script>';
                }else if(type=='css'){
                    tagHead='<link rel="stylesheet" href="';
                    tagBottom='">';
                }
                for(var i=0;i<arr.length;i++){
                    var one=tagHead+arr[i]+tagBottom;
                    all+=one
                }
                return all
            }
            var jsAll=injectFile(htmlPluginData.assets.js,'js'),
                cssAll=injectFile(htmlPluginData.assets.css,'css'),
                str=htmlPluginData.html;
            str=str.replace('{% block head %}{% endblock %}','{% block head %}'+cssAll+'{% endblock %}');
            str=str.replace('{% block script %}{% endblock %}','{% block script %}'+jsAll+'{% endblock %}');
            htmlPluginData.html=str;
            callback(null, htmlPluginData);
        });
    });

};

module.exports = MyPlugin;