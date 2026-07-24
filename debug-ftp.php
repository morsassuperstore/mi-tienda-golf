<?php
header('Content-Type: text/plain');
echo "FTP Deploy Debug Info:\n";
echo "Current Directory: " . __DIR__ . "\n";

$json_path = __DIR__ . '/data/home.json';
if (file_exists($json_path)) {
    echo "data/home.json exists.\n";
    echo "Last Modified: " . date("F d Y H:i:s.", filemtime($json_path)) . "\n";
    echo "Size: " . filesize($json_path) . " bytes\n";
    echo "Is Readable: " . (is_readable($json_path) ? 'Yes' : 'No') . "\n";
    echo "File Contents:\n";
    $content = file_get_contents($json_path);
    echo $content . "\n";
} else {
    echo "data/home.json does NOT exist!\n";
}
?>
