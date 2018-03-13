<?php

$con = mysqli_connect('localhost:8889', 'root', 'root', 'js_shoutbox');

  if(mysqli_connect_errno()) {
    echo 'Failed to connect: ' . mysqli_connect_error();
  }

?>
