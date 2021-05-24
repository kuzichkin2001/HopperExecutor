import json
from datetime import date as dt
from django.shortcuts import render
from hopper.forms import CodeForm
from hopper.models import Session
from django.http import JsonResponse, HttpRequest


# Create your views here.
def index(request):
	sessions_query_set = Session.objects.all()
	sessions = []
	for session in sessions_query_set:
		sessions.append(session)
	return render(request, 'hopper/home/session.html', { "sessions": sessions })


def save_session(request):
	if request.method == 'PATCH':
		req = json.loads(request.body.decode())
		model_obj = Session.objects.get(session_id=req["id"])
		model_obj.code = req["code"]
		model_obj.kuz_place = req["kuz_place"]
		model_obj.save()
		return JsonResponse({"status": 200})


def session(request, session_id):
	form = CodeForm()
	current_session = Session.objects.get(session_id=session_id)
	return render(request, "hopper/session/base.html", {
		"current_session": current_session,
		"form": form
	})

def delete_session(request, session_id):
	sess = Session.objects.filter(session_id=session_id)
	sess.delete()
	return JsonResponse({"status": 200})


def new_session(request):
	req = json.loads(request.body.decode())
	Session.objects.create(
		name=req["name"],
		kuz_place=req["kuz_place"],
		code=req["code"],
		creationDate=dt.fromtimestamp(req["creationDate"]/1000)
	)
	return JsonResponse({"status": 200})
