<?php

use Intervention\Image\Facades\Image;

function resizeImageAndMoveToDirectories($file, $destination, $width, $height, $fileNamePrefix) {
    try {
        if (!file_exists($destination)) {
            mkdir( $destination, 0777, true );
        }
        $filename = uniqid($fileNamePrefix).$file->getClientOriginalName();
        $fileStoredPath = $destination.'/'.$filename;
        $img = Image::make($file->getRealPath())->resize($width, $height, function($constraint)
        {
            $constraint->aspectRatio();
        });
        $img->save($fileStoredPath);
        return [
            'status' => 200,
            'imagePath' => $fileStoredPath
        ];
    } catch (\Exception $e) {
        dd('M:'.$e->getMessage(),'F:'.$e->getFile().'L:'.$e->getFile());
        return [
            'status' => 500,
            'message' => $e->getMessage()
        ];
    }
}

function formateDate($date) {
    $date = DateTimeImmutable::createFromFormat('Y-m-d', $date);
    return $date->format('F').' '.$date->format('d').','.' '.$date->format('Y');
}
