<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index(Request $request){
        $p = new Produk();
        if($request->input('cari')){
            $p = $p->where('namaProduk','like','%'.$request->input('cari').'%');
        }
        $perPage = $request->input('perPage')??10;

        return response()->json($p->paginate($perPage));
    }
}
