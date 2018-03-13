<?php include 'database.php'; ?>

<?php
	$query = "SELECT * FROM shouts ORDER BY id DESC";
	$shouts = mysqli_query($con, $query);
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PHP Shoutbox</title>
    <link rel="stylesheet" href="style.css">
    <script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
    <script src="script.js" charset="utf-8"></script>
  </head>
  <body>
    <div id="container">
      <header>
        <h1>Shoutbox</h1>
      </header>
      <div id="shouts">
        <ul>
					<?php while($row = mysqli_fetch_assoc($shouts)) : ?>
						<li><?php echo $row['name']; ?>: <?php echo $row['shout']; ?> [<?php echo $row['date']; ?>]</li>
					<?php endwhile; ?>
				</ul>
      </div>
      <footer>
        <form>
          <label>Name:</label>
          <input type="text" id="name">
          <label>Text: </label>
          <input type="text" id="shout">
          <input type="submit" id="submit" value="Shout!">
        </form>
        <p id=message></p>
      </footer>
    </div>
  </body>
</html>
