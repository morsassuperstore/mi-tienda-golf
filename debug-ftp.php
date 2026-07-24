<?php
header('Content-Type: text/plain');
echo "FTP Deploy Debug Info:\n";
echo "Current File Path: " . __FILE__ . "\n";
echo "Current Directory: " . __DIR__ . "\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Files in this directory:\n";
$files = scandir(__DIR__);
foreach ($files as $file) {
    if ($file != '.' && $file != '..') {
        echo "  - $file (" . date("F d Y H:i:s.", filemtime($file)) . ")\n";
    }
}
?>
