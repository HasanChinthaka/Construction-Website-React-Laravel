<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testimonials
        ]);
    }
    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'errors' => "Testimonial not found"
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $testimonial
        ]);
    }
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $testimonial = new Testimonial();
        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->designation = $request->designation;
        $testimonial->save();

        // save temp image
        if ($request->imageId > 0) {

            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                $textArray = explode('.', $tempImage->name);
                $ext = last($textArray);

                $fileName = strtotime('now') . $testimonial->id . '.' . $ext;
                // Create small thumbnail
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/testimonials/' . $fileName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);


                $testimonial->image = $fileName;
                $testimonial->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => "Testimonial added successfully"
        ]);
    }
    public function update($id, Request $request)
    {
        $testimonial = Testimonial::find($id);

        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'errors' => "Testimonial not found"
            ]);
        }

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }


        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->designation = $request->designation;
        $testimonial->save();

        // save temp image
        if ($request->imageId > 0) {
            $oldImage = $testimonial->image;

            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                $textArray = explode('.', $tempImage->name);
                $ext = last($textArray);

                $fileName = strtotime('now') . $testimonial->id . '.' . $ext;
                // Create small thumbnail
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/testimonials/' . $fileName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);


                $testimonial->image = $fileName;
                $testimonial->save();

                if ($oldImage != ' ') {
                    File::delete(public_path('uploads/testimonials/' . $oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => "Testimonial updated successfully"
        ]);
    }
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'errors' => "Testimonial not found"
            ]);
        }

        File::delete(public_path('uploads/testimonials/' . $testimonial->image));

        $testimonial->delete();

        return response()->json([
            'status' => true,
            'message' => "Testimonial deleted successfully"
        ]);
    }
}
