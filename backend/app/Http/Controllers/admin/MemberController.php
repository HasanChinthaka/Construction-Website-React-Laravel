<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        // save temp image
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                $textArray = explode('.', $tempImage->name);
                $ext = last($textArray);

                $fileName = strtotime('now') . $member->id . '.' . $ext;
                // Create small thumbnail
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/members/' . $fileName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Member added successfully'
        ]);
    }
    public function show($id)
    {
        $member = Member::find($id);

        if ($member == null) {
            return response()->json([
                'status' => false,
                'errors' => "Member not found"
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $member
        ]);
    }
    public function update($id, Request $request)
    {
        $member = Member::find($id);

        if ($member == null) {
            return response()->json([
                'status' => false,
                'errors' => "Member not found"
            ]);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        // save temp image
        if ($request->imageId > 0) {
            $oldImage = $member->image;
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                $textArray = explode('.', $tempImage->name);
                $ext = last($textArray);

                $fileName = strtotime('now') . $member->id . '.' . $ext;
                // Create small thumbnail
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/members' . $fileName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();

                if ($oldImage != ' ') {
                    File::delete(public_path('uploads/members/' . $oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Member updated successfully'
        ]);
    }
    public function destroy($id)
    {
        $member = Member::find($id);

        if ($member == null) {
            return response()->json([
                'status' => false,
                'errors' => "Member not found"
            ]);
        }

        File::delete(public_path('uploads/members/' . $member->image));

        $member->delete();

        return response()->json([
            'status' => true,
            'message' => 'Member deleted successfully'
        ]);
    }
}
