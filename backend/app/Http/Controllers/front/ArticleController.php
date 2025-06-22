<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // This method will retrun all active articles
    public function index()
    {
        $articles = Article::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }

    // This method will retrun all active articles
    public function latestArticles(Request $request)
    {
        $articles = Article::where('status', 1)
            ->take($request->get('limit'))
            ->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }

    public function show($id)
    {
        $article = Article::find($id);

        if ($article == null) {
            return response()->json([
                'status' => false,
                'errors' => "Article not found"
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }
}
