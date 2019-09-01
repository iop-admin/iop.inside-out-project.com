<?php

require_once 'config.inc.php';
require_once 'include/core/functions.inc.php';
if ($viewPatches) {echo $footer;}

?>
</div>

<div id="contactPanel" class="infoPanel">
     <div class="panHeader">
          <span style="float: left;">Contect You Professor</span> <span id="contactPanelCloseBtn" style="float: right;"
               class="panClsBtn"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
     </div>

     <div class="panBody" style="clear: both;">
          <p><strong>Professor/Instructor Information:<br /></strong>Office: Penn 222<br />Phone: 610-372-4721 x
               5258<br />Cell: 610-213-9724<br />e-mail: bsavage@racc.edu
               <br />Preferred Communication: <a title="Help Forum" target="_blank"
                    href="https://racc.instructure.com/conversations">CANVAS</a>
          </p>
     </div>
     <div class="panFooter">
     </div>
</div>
<div id="overlay">
     <div id="registration">
          <a href="#" class="close" onclick="event.preventDefault();""><i class=" far fa-times-circle"></i> </a>
     </div>
</div>

<code data-anijs="if: click, on: .rsvp, do: $addClass open, to: #overlay;
                  if: click, on: .close, do: $removeClass open, to: #overlay">
</code>
<script src="<?php echo VENDOR_PATH; ?>/jquery/jquery.min.js"></script>
<script src="<?php echo VENDOR_PATH; ?>/jquery/jquery-ui.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/materialize/0.95.1/js/materialize.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"
     integrity="sha256-CjSoeELFOcH0/uxWu6mC/Vlrc1AARqbm/jiiImDGV3s=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
     integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous">
</script>
<script src="<?php echo VENDOR_PATH; ?>/foundation/foundation.min.js"></script>
<script src="<?php echo VENDOR_PATH; ?>/lazysizes/lazysizes.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.5/lazysizes.min.js"></script>
<script async src="assets/js/custom.js"></script>
<script async src="https://hypothes.is/embed.js"></script>
<script>
     window.hypothesisConfig = function () {
          return {
               "showHighlights": true
          };
     };
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
</script>
<script src="https://anijs.github.io/lib/anijs/anijs.js"></script>
<script src="https://anijs.github.io/lib/anijs/helpers/dom/anijs-helper-dom-min.js"></script>
<script>

     if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('service-worker.js');
     }

     /*
     if ('serviceWorker' in navigator && 'PushManager' in window) {
       console.log('Service Worker and Push is supported');

       navigator.serviceWorker.register('service-worker.js')
       .then(function(swReg) {
         console.log('Service Worker is registered', swReg);

          swRegistration = swReg;
         initializeUI();
       })
       .catch(function(error) {
         console.error('Service Worker Error', error);
       });
     } else {
       console.warn('Push messaging is not supported');
       pushButton.textContent = 'Push Not Supported';
     }
     */
</script>
<footer>Updated <?php echo $fileUpdateTime; ?></footer>
</body>

</html>

<?php


// We're done! Save the cached content to a file
$fp = fopen($cachefile, 'w');
fwrite($fp, ob_get_contents());
fclose($fp);
// finally send browser output
ob_end_flush();
?>